from datetime import datetime, timezone
from xml.sax.saxutils import escape

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Blog, Service

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


@router.get("/sitemap.xml", response_class=Response)
def sitemap_xml(db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    urls: list[tuple[str, str, str]] = [
        (f"{SITE_URL}/", now, "1.0"),
        (f"{SITE_URL}/services", now, "0.9"),
        (f"{SITE_URL}/gallery", now, "0.7"),
        (f"{SITE_URL}/blogs", now, "0.8"),
    ]

    services = (
        db.query(Service)
        .filter(Service.is_published.is_(True))
        .order_by(Service.sort_order.asc(), Service.id.desc())
        .all()
    )
    for s in services:
        lastmod = (s.updated_at or s.created_at or datetime.now(timezone.utc)).strftime("%Y-%m-%d")
        urls.append((f"{SITE_URL}/{s.slug}", lastmod, "0.8"))

    blogs = (
        db.query(Blog)
        .filter(Blog.is_published.is_(True))
        .order_by(Blog.id.desc())
        .all()
    )
    for b in blogs:
        lastmod = (b.updated_at or b.created_at or datetime.now(timezone.utc)).strftime("%Y-%m-%d")
        urls.append((f"{SITE_URL}/blogs/{b.slug}", lastmod, "0.7"))

    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for loc, lastmod, priority in urls:
        parts.append("  <url>")
        parts.append(f"    <loc>{escape(loc)}</loc>")
        parts.append(f"    <lastmod>{lastmod}</lastmod>")
        parts.append(f"    <priority>{priority}</priority>")
        parts.append("  </url>")
    parts.append("</urlset>")
    xml = "\n".join(parts) + "\n"
    return Response(content=xml, media_type="application/xml; charset=utf-8")
