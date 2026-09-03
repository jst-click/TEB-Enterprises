from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, ContactEnquiry
from ..schemas import ContactCreate, ContactOut, ContactReadUpdate

router = APIRouter(prefix="/api/contacts", tags=["contacts"])


@router.post("/", response_model=ContactOut, status_code=status.HTTP_201_CREATED)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    item = ContactEnquiry(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/", response_model=list[ContactOut])
def list_contacts(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return db.query(ContactEnquiry).order_by(ContactEnquiry.id.desc()).all()


@router.patch("/{contact_id}", response_model=ContactOut)
def mark_read(
    contact_id: int,
    payload: ContactReadUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(ContactEnquiry).filter(ContactEnquiry.id == contact_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Contact not found")
    item.is_read = payload.is_read
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    item = db.query(ContactEnquiry).filter(ContactEnquiry.id == contact_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(item)
    db.commit()
    return None
