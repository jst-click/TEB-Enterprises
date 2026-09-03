from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .auth import hash_password
from .config import settings
from .database import Base, SessionLocal, engine
from .models import Admin, SiteSettings
from .routers import auth, blogs, contacts, gallery, nav, settings as settings_router, uploads
from .routers.settings import DEFAULT_EMAIL, DEFAULT_WHATSAPP

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


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    seed_admin()
    seed_settings()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "TEB Enterprises"}
