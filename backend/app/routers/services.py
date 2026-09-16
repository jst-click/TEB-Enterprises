import re

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, Service
from ..schemas import ServiceCreate, ServiceOut, ServiceUpdate

router = APIRouter(prefix="/api/services", tags=["services"])


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-") or "service"


@router.get("/public", response_model=list[ServiceOut])
def list_public(
    db: Session = Depends(get_db),
    audience: str | None = Query(None),
    category: str | None = Query(None),
    grid: bool | None = Query(None),
    featured: bool | None = Query(None),
):
    q = db.query(Service).filter(Service.is_published.is_(True))
    if audience:
        q = q.filter(Service.audience.in_([audience, "both"]))
    if category:
        q = q.filter(Service.category == category)
    if grid is True:
        q = q.filter(Service.show_in_grid.is_(True))
    if featured is True:
        q = q.filter(Service.is_featured.is_(True))
    return q.order_by(Service.sort_order.asc(), Service.id.asc()).all()


@router.get("/public/{slug}", response_model=ServiceOut)
def get_public(slug: str, db: Session = Depends(get_db)):
    item = db.query(Service).filter(Service.slug == slug, Service.is_published.is_(True)).first()
    if not item:
        raise HTTPException(status_code=404, detail="Service not found")
    return item


@router.get("/", response_model=list[ServiceOut])
def list_all(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(Service).order_by(Service.sort_order.asc(), Service.id.desc()).all()


@router.post("/", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    data = payload.model_dump()
    slug = data.get("slug") or slugify(data["title"])
    base = slug
    i = 1
    while db.query(Service).filter(Service.slug == slug).first():
        slug = f"{base}-{i}"
        i += 1
    data["slug"] = slug
    item = Service(**data)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/{service_id}", response_model=ServiceOut)
def get_one(
    service_id: int,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(Service).filter(Service.id == service_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Service not found")
    return item


@router.put("/{service_id}", response_model=ServiceOut)
def update_service(
    service_id: int,
    payload: ServiceUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(Service).filter(Service.id == service_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Service not found")
    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"]:
        data["slug"] = slugify(data["slug"])
        exists = db.query(Service).filter(Service.slug == data["slug"], Service.id != service_id).first()
        if exists:
            raise HTTPException(status_code=400, detail="Slug already in use")
    for key, value in data.items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(Service).filter(Service.id == service_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(item)
    db.commit()
    return None
