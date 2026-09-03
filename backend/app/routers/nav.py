from pathlib import Path

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Blog, GalleryItem
from ..schemas import NavFlags

router = APIRouter(prefix="/api", tags=["nav"])


@router.get("/nav-flags", response_model=NavFlags)
def nav_flags(db: Session = Depends(get_db)):
    gallery_count = db.query(GalleryItem).filter(GalleryItem.is_published.is_(True)).count()
    blogs_count = db.query(Blog).filter(Blog.is_published.is_(True)).count()
    return NavFlags(
        show_gallery=gallery_count > 0,
        show_blogs=blogs_count > 0,
        gallery_count=gallery_count,
        blogs_count=blogs_count,
    )


def ensure_upload_dir() -> Path:
    path = Path("uploads")
    path.mkdir(parents=True, exist_ok=True)
    return path
