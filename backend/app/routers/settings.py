import json

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, Blog, SiteSettings
from ..schemas import SettingsOut, SettingsPublic, SettingsUpdate

router = APIRouter(prefix="/api/settings", tags=["settings"])

DEFAULT_WHATSAPP = "917996688885"
DEFAULT_EMAIL = "sales@teamcleaningexperts.in"
SITE_URL = "https://tebpestcontrol.com"

DEFAULT_SITEMAP_URLS = [
    f"{SITE_URL}/cockroach-control-bangalore",
    f"{SITE_URL}/termite-control-bangalore",
    f"{SITE_URL}/bed-bug-control-bangalore",
    f"{SITE_URL}/rodent-control-bangalore",
    f"{SITE_URL}/mosquito-control-bangalore",
    f"{SITE_URL}/ant-control-bangalore",
    f"{SITE_URL}/residential-pest-control-bangalore",
    f"{SITE_URL}/commercial-pest-control-bangalore",
    f"{SITE_URL}/pest-control-amc-bangalore",
    f"{SITE_URL}/pest-control-electronic-city",
    f"{SITE_URL}/pest-control-hsr-layout",
    f"{SITE_URL}/pest-control-kr-puram",
    f"{SITE_URL}/pest-control-hoodi",
    f"{SITE_URL}/pest-control-brookefield",
    f"{SITE_URL}/pest-control-bellandur",
    f"{SITE_URL}/pest-control-sarjapur-road",
    f"{SITE_URL}/pest-control-marathahalli",
    f"{SITE_URL}/pest-control-whitefield",
]


def parse_sitemap_urls(raw: str | None) -> list[str]:
    if not raw or not str(raw).strip():
        return []
    try:
        data = json.loads(raw)
        if isinstance(data, list):
            out: list[str] = []
            for item in data:
                if isinstance(item, str) and item.strip():
                    out.append(item.strip())
                elif isinstance(item, dict) and item.get("loc"):
                    out.append(str(item["loc"]).strip())
            return out
    except json.JSONDecodeError:
        pass
    # Fallback: one URL per line
    return [line.strip() for line in str(raw).splitlines() if line.strip()]


def normalize_sitemap_url(url: str) -> str | None:
    value = (url or "").strip()
    if not value:
        return None
    if value.startswith("/"):
        value = f"{SITE_URL}{value}"
    elif not value.startswith("http://") and not value.startswith("https://"):
        value = f"{SITE_URL}/{value.lstrip('/')}"
    # Prefer apex HTTPS
    value = value.replace("http://www.tebpestcontrol.com", SITE_URL)
    value = value.replace("https://www.tebpestcontrol.com", SITE_URL)
    value = value.replace("http://tebpestcontrol.com", SITE_URL)
    return value.rstrip("/") if value.rstrip("/") != SITE_URL else f"{SITE_URL}/"


def normalize_sitemap_urls(urls: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for url in urls:
        normalized = normalize_sitemap_url(url)
        if not normalized:
            continue
        key = normalized.rstrip("/").lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(normalized)
    return out


def dump_sitemap_urls(urls: list[str]) -> str:
    return json.dumps(normalize_sitemap_urls(urls), ensure_ascii=False)


def blog_sitemap_urls(db: Session) -> list[str]:
    """All published blogs map under https://tebpestcontrol.com/blogs/{slug}."""
    blogs = (
        db.query(Blog)
        .filter(Blog.is_published.is_(True))
        .order_by(Blog.id.desc())
        .all()
    )
    return [f"{SITE_URL}/blogs/{b.slug}" for b in blogs]


def settings_to_out(row: SiteSettings, db: Session | None = None) -> SettingsOut:
    urls = parse_sitemap_urls(row.sitemap_urls)
    if not urls:
        urls = list(DEFAULT_SITEMAP_URLS)
    auto_blogs: list[str] = []
    if db is not None:
        auto_blogs = blog_sitemap_urls(db)
    return SettingsOut(
        id=row.id,
        whatsapp_number=row.whatsapp_number,
        contact_email=row.contact_email,
        sitemap_urls=urls,
        blog_sitemap_urls=auto_blogs,
        updated_at=row.updated_at,
    )


def get_or_create_settings(db: Session) -> SiteSettings:
    row = db.query(SiteSettings).order_by(SiteSettings.id.asc()).first()
    if row:
        return row
    row = SiteSettings(
        whatsapp_number=DEFAULT_WHATSAPP,
        contact_email=DEFAULT_EMAIL,
        sitemap_urls=dump_sitemap_urls(DEFAULT_SITEMAP_URLS),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def ensure_sitemap_urls(db: Session) -> None:
    row = get_or_create_settings(db)
    existing = parse_sitemap_urls(row.sitemap_urls)
    if existing:
        return
    row.sitemap_urls = dump_sitemap_urls(DEFAULT_SITEMAP_URLS)
    db.commit()


@router.get("/public", response_model=SettingsPublic)
def public_settings(db: Session = Depends(get_db)):
    row = get_or_create_settings(db)
    return SettingsPublic(whatsapp_number=row.whatsapp_number, contact_email=row.contact_email)


@router.get("/", response_model=SettingsOut)
def get_settings(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return settings_to_out(get_or_create_settings(db), db)


@router.put("/", response_model=SettingsOut)
def update_settings(
    payload: SettingsUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    row = get_or_create_settings(db)
    digits = "".join(ch for ch in payload.whatsapp_number if ch.isdigit())
    row.whatsapp_number = digits
    row.contact_email = str(payload.contact_email)
    row.sitemap_urls = dump_sitemap_urls(payload.sitemap_urls)
    db.commit()
    db.refresh(row)
    return settings_to_out(row, db)
