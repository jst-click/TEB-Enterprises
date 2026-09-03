import re

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, Blog
from ..schemas import BlogCreate, BlogOut, BlogUpdate

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-") or "post"


@router.get("/public", response_model=list[BlogOut])
def list_public(db: Session = Depends(get_db)):
    return (
        db.query(Blog)
        .filter(Blog.is_published.is_(True))
        .order_by(Blog.id.desc())
        .all()
    )


@router.get("/public/{slug}", response_model=BlogOut)
def get_public(slug: str, db: Session = Depends(get_db)):
    blog = db.query(Blog).filter(Blog.slug == slug, Blog.is_published.is_(True)).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.get("/", response_model=list[BlogOut])
def list_all(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(Blog).order_by(Blog.id.desc()).all()


@router.post("/", response_model=BlogOut, status_code=status.HTTP_201_CREATED)
def create_blog(
    payload: BlogCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    data = payload.model_dump()
    slug = data.get("slug") or slugify(data["title"])
    base = slug
    i = 1
    while db.query(Blog).filter(Blog.slug == slug).first():
        slug = f"{base}-{i}"
        i += 1
    data["slug"] = slug
    blog = Blog(**data)
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.put("/{blog_id}", response_model=BlogOut)
def update_blog(
    blog_id: int,
    payload: BlogUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"]:
        data["slug"] = slugify(data["slug"])
        exists = db.query(Blog).filter(Blog.slug == data["slug"], Blog.id != blog_id).first()
        if exists:
            raise HTTPException(status_code=400, detail="Slug already in use")
    for key, value in data.items():
        setattr(blog, key, value)
    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog(
    blog_id: int,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    return None
