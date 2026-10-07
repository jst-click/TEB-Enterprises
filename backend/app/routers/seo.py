from datetime import datetime, timezone
from xml.sax.saxutils import escape

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Blog, Service, SiteSettings
from .settings import DEFAULT_SITEMAP_URLS, parse_sitemap_urls

router = APIRouter(tags=["seo"])

SITE_URL = "https://tebpestcontrol.com"


def _robots_body() -> str:
    return f"""User-agent: *
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
"""


@router.get("/robots.txt", response_class=Response)
@router.get("/robot.txt", response_class=Response)
def robots_txt():
    return Response(content=_robots_body(), media_type="text/plain; charset=utf-8")


def _priority_for(loc: str) -> str:
    path = loc.replace(SITE_URL, "").rstrip("/") or "/"
    if path == "/":
        return "1.0"
    if path == "/services":
        return "0.9"
    if path == "/blogs":
        return "0.8"
    if path.startswith("/blogs/"):
        return "0.7"
    if path in ("/gallery", "/about-us", "/contact-us"):
        return "0.7"
    return "0.8"


def published_blog_urls(db: Session) -> list[tuple[str, str]]:
    """Every published blog → /blogs/{slug}. Old and new posts included automatically."""
    blogs = (
        db.query(Blog)
        .filter(Blog.is_published.is_(True))
        .order_by(Blog.id.desc())
        .all()
    )
    out: list[tuple[str, str]] = []
    for b in blogs:
        lastmod = (b.updated_at or b.created_at or datetime.now(timezone.utc)).strftime("%Y-%m-%d")
        out.append((f"{SITE_URL}/blogs/{b.slug}", lastmod))
    return out


@router.get("/sitemap.xml", response_class=Response)
def sitemap_xml(db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    # loc -> (lastmod, priority); first write wins
    entries: dict[str, tuple[str, str]] = {}

    def add(loc: str, lastmod: str | None = None, priority: str | None = None) -> None:
        key = loc.rstrip("/") if loc.rstrip("/") != SITE_URL else f"{SITE_URL}/"
        if key in entries:
            return
        entries[key] = (lastmod or now, priority or _priority_for(key))

    # Core index pages
    add(f"{SITE_URL}/", now, "1.0")
    add(f"{SITE_URL}/services", now, "0.9")
    add(f"{SITE_URL}/gallery", now, "0.7")
    add(f"{SITE_URL}/about-us", now, "0.7")
    add(f"{SITE_URL}/contact-us", now, "0.7")

    # Blog category index + every published post (auto — old & new)
    add(f"{SITE_URL}/blogs", now, "0.8")
    for loc, lastmod in published_blog_urls(db):
        add(loc, lastmod, "0.7")

    # Admin-managed sitemap URLs (service + area pages)
    row = db.query(SiteSettings).order_by(SiteSettings.id.asc()).first()
    admin_urls = parse_sitemap_urls(row.sitemap_urls if row else None)
    if not admin_urls:
        admin_urls = list(DEFAULT_SITEMAP_URLS)
    for url in admin_urls:
        add(url, now, "0.8")

    # Published services (covers any not yet added in admin)
    services = (
        db.query(Service)
        .filter(Service.is_published.is_(True))
        .order_by(Service.sort_order.asc(), Service.id.desc())
        .all()
    )
    for s in services:
        lastmod = (s.updated_at or s.created_at or datetime.now(timezone.utc)).strftime("%Y-%m-%d")
        add(f"{SITE_URL}/{s.slug}", lastmod, "0.8")

    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for loc, (lastmod, priority) in entries.items():
        parts.append("  <url>")
        parts.append(f"    <loc>{escape(loc)}</loc>")
        parts.append(f"    <lastmod>{lastmod}</lastmod>")
        parts.append(f"    <priority>{priority}</priority>")
        parts.append("  </url>")
    parts.append("</urlset>")
    xml = "\n".join(parts) + "\n"
    return Response(content=xml, media_type="application/xml; charset=utf-8")
