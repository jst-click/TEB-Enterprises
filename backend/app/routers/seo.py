from datetime import date, datetime, timezone
from xml.sax.saxutils import escape

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Blog, Service, SiteSettings
from .settings import DEFAULT_SITEMAP_URLS, parse_sitemap_urls

router = APIRouter(tags=["seo"])

SITE_URL = "https://tebpestcontrol.com"

CATEGORY_PATHS = (
    "/services?category=location",
    "/services?category=pest",
    "/services?category=residential",
    "/services?category=commercial",
    "/services?category=amc",
)


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
    path = loc.replace(SITE_URL, "") or "/"
    if path == "/":
        return "1.0"
    if path == "/services" or path.startswith("/services?"):
        return "0.9" if path == "/services" else "0.85"
    if path == "/blogs":
        return "0.8"
    if path.startswith("/blogs/"):
        return "0.7"
    if path in ("/gallery", "/about-us", "/contact-us"):
        return "0.7"
    return "0.8"


def _fmt_day(value) -> str:
    """Safe YYYY-MM-DD for lastmod — never raises."""
    if value is None:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if isinstance(value, datetime):
        return value.strftime("%Y-%m-%d")
    if isinstance(value, date):
        return value.strftime("%Y-%m-%d")
    try:
        return str(value)[:10]
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def _fallback_sitemap_xml() -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    locs = [
        f"{SITE_URL}/",
        f"{SITE_URL}/services",
        *[f"{SITE_URL}{p}" for p in CATEGORY_PATHS],
        f"{SITE_URL}/gallery",
        f"{SITE_URL}/blogs",
        f"{SITE_URL}/about-us",
        f"{SITE_URL}/contact-us",
        *DEFAULT_SITEMAP_URLS,
    ]
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    seen: set[str] = set()
    for loc in locs:
        key = loc if loc.endswith("/") or "?" in loc else loc.rstrip("/")
        if key in seen:
            continue
        seen.add(key)
        parts.append("  <url>")
        parts.append(f"    <loc>{escape(key)}</loc>")
        parts.append(f"    <lastmod>{now}</lastmod>")
        parts.append(f"    <priority>{_priority_for(key)}</priority>")
        parts.append("  </url>")
    parts.append("</urlset>")
    return "\n".join(parts) + "\n"


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
        slug = (b.slug or "").strip()
        if not slug:
            continue
        lastmod = _fmt_day(b.updated_at or b.created_at)
        out.append((f"{SITE_URL}/blogs/{slug}", lastmod))
    return out


@router.get("/sitemap.xml", response_class=Response)
def sitemap_xml(db: Session = Depends(get_db)):
    """Always return valid XML — never 500 for GSC."""
    try:
        now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        entries: dict[str, tuple[str, str]] = {}

        def add(loc: str, lastmod: str | None = None, priority: str | None = None) -> None:
            raw = (loc or "").strip()
            if not raw:
                return
            if raw.rstrip("/") == SITE_URL:
                key = f"{SITE_URL}/"
            elif "?" in raw:
                key = raw
            else:
                key = raw.rstrip("/")
            if key in entries:
                return
            entries[key] = (lastmod or now, priority or _priority_for(key))

        add(f"{SITE_URL}/", now, "1.0")
        add(f"{SITE_URL}/services", now, "0.9")
        for path in CATEGORY_PATHS:
            add(f"{SITE_URL}{path}", now, "0.85")
        add(f"{SITE_URL}/gallery", now, "0.7")
        add(f"{SITE_URL}/about-us", now, "0.7")
        add(f"{SITE_URL}/contact-us", now, "0.7")

        add(f"{SITE_URL}/blogs", now, "0.8")
        try:
            for loc, lastmod in published_blog_urls(db):
                add(loc, lastmod, "0.7")
        except Exception:
            pass

        try:
            row = db.query(SiteSettings).order_by(SiteSettings.id.asc()).first()
            admin_urls = parse_sitemap_urls(getattr(row, "sitemap_urls", None) if row else None)
        except Exception:
            admin_urls = []
        if not admin_urls:
            admin_urls = list(DEFAULT_SITEMAP_URLS)
        for url in admin_urls:
            add(url, now, "0.8")

        try:
            services = (
                db.query(Service)
                .filter(Service.is_published.is_(True))
                .order_by(Service.sort_order.asc(), Service.id.desc())
                .all()
            )
            for s in services:
                slug = (s.slug or "").strip()
                if not slug:
                    continue
                lastmod = _fmt_day(s.updated_at or s.created_at)
                add(f"{SITE_URL}/{slug}", lastmod, "0.8")
        except Exception:
            pass

        parts = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ]
        for loc, (lastmod, priority) in entries.items():
            parts.append("  <url>")
            parts.append(f"    <loc>{escape(loc)}</loc>")
            parts.append(f"    <lastmod>{escape(lastmod)}</lastmod>")
            parts.append(f"    <priority>{escape(priority)}</priority>")
            parts.append("  </url>")
        parts.append("</urlset>")
        xml = "\n".join(parts) + "\n"
        return Response(content=xml, media_type="application/xml; charset=utf-8")
    except Exception:
        return Response(
            content=_fallback_sitemap_xml(),
            media_type="application/xml; charset=utf-8",
        )
