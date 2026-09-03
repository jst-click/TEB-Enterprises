from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, GalleryItem
from ..schemas import GalleryCreate, GalleryOut, GalleryUpdate

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


@router.get("/public", response_model=list[GalleryOut])
def list_public(db: Session = Depends(get_db)):
    return (
        db.query(GalleryItem)
        .filter(GalleryItem.is_published.is_(True))
        .order_by(GalleryItem.sort_order.asc(), GalleryItem.id.desc())
        .all()
    )


@router.get("/", response_model=list[GalleryOut])
def list_all(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(GalleryItem).order_by(GalleryItem.sort_order.asc(), GalleryItem.id.desc()).all()


@router.post("/", response_model=GalleryOut, status_code=status.HTTP_201_CREATED)
def create_item(
    payload: GalleryCreate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = GalleryItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=GalleryOut)
def update_item(
    item_id: int,
    payload: GalleryUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(GalleryItem).filter(GalleryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Gallery item not found")
    db.delete(item)
    db.commit()
    return None
