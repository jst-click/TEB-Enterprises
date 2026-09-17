from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from sqlalchemy import text

from .auth import hash_password
from .config import settings
from .database import Base, SessionLocal, engine
from .models import Admin, SiteSettings
from .routers import auth, blogs, contacts, gallery, homepage, nav, seo, services, settings as settings_router, uploads
from .routers.settings import DEFAULT_EMAIL, DEFAULT_WHATSAPP
from .seed_homepage import seed_homepage as seed_homepage_data
from .seed_services import seed_services as seed_services_data

app = FastAPI(title="TEB Enterprises API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

upload_path = settings.upload_path
app.mount("/uploads", StaticFiles(directory=str(upload_path)), name="uploads")

app.include_router(auth.router)
app.include_router(gallery.router)
app.include_router(blogs.router)
app.include_router(uploads.router)
app.include_router(nav.router)
app.include_router(settings_router.router)
app.include_router(contacts.router)
app.include_router(services.router)
app.include_router(homepage.router)
app.include_router(seo.router)


def seed_admin() -> None:
    db = SessionLocal()
    try:
        existing = db.query(Admin).filter(Admin.email == settings.admin_email).first()
        if not existing:
            db.add(
                Admin(
                    email=settings.admin_email,
                    hashed_password=hash_password(settings.admin_password),
                )
            )
            db.commit()
    finally:
        db.close()


def seed_settings() -> None:
    db = SessionLocal()
    try:
        if not db.query(SiteSettings).first():
            db.add(
                SiteSettings(
                    whatsapp_number=DEFAULT_WHATSAPP,
                    contact_email=DEFAULT_EMAIL,
                )
            )
            db.commit()
    finally:
        db.close()


def seed_services() -> None:
    db = SessionLocal()
    try:
        seed_services_data(db)
    finally:
        db.close()


def seed_homepage() -> None:
    db = SessionLocal()
    try:
        seed_homepage_data(db)
    finally:
        db.close()


def ensure_schema() -> None:
    columns = {
        "cover_image": "VARCHAR(500)",
        "scope_title": "VARCHAR(255)",
        "about_eyebrow": "VARCHAR(120)",
        "about_title": "VARCHAR(255)",
        "about_image": "VARCHAR(500)",
        "why_eyebrow": "VARCHAR(120)",
        "why_title": "VARCHAR(255)",
        "why_items": "TEXT",
        "process_eyebrow": "VARCHAR(120)",
        "process_title": "VARCHAR(255)",
        "process_items": "TEXT",
        "gallery_images": "TEXT",
        "related_eyebrow": "VARCHAR(120)",
        "related_title": "VARCHAR(255)",
        "faq_eyebrow": "VARCHAR(120)",
        "faq_title": "VARCHAR(255)",
        "faq_items": "TEXT",
        "cta_title": "VARCHAR(255)",
        "cta_text": "TEXT",
    }
    with engine.begin() as conn:
        for name, col_type in columns.items():
            conn.execute(text(f"ALTER TABLE services ADD COLUMN IF NOT EXISTS {name} {col_type}"))


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    ensure_schema()
    seed_admin()
    seed_settings()
    seed_services()
    seed_homepage()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "TEB Enterprises"}
