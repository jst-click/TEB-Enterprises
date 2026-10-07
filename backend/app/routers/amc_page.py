import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, AmcPageSection
from ..schemas import AmcPagePublic, AmcPageSectionOut, AmcPageSectionUpdate
from ..seed_amc_page import seed_amc_page

router = APIRouter(prefix="/api/amc-page", tags=["amc-page"])


def _parse(row: AmcPageSection) -> AmcPageSectionOut:
    try:
        data = json.loads(row.data or "{}")
    except json.JSONDecodeError:
        data = {}
    return AmcPageSectionOut(
        id=row.id,
        key=row.key,
        label=row.label,
        sort_order=row.sort_order,
        data=data if isinstance(data, dict) else {},
        updated_at=row.updated_at,
    )


@router.get("/public", response_model=AmcPagePublic)
def public_amc_page(db: Session = Depends(get_db)):
    seed_amc_page(db)
    rows = db.query(AmcPageSection).order_by(AmcPageSection.sort_order.asc()).all()
    return AmcPagePublic(sections={row.key: _parse(row).data for row in rows})


@router.get("/", response_model=list[AmcPageSectionOut])
def list_sections(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    seed_amc_page(db)
    rows = db.query(AmcPageSection).order_by(AmcPageSection.sort_order.asc()).all()
    return [_parse(row) for row in rows]


@router.get("/{key}", response_model=AmcPageSectionOut)
def get_section(key: str, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    seed_amc_page(db)
    row = db.query(AmcPageSection).filter(AmcPageSection.key == key).first()
    if not row:
        raise HTTPException(status_code=404, detail="Section not found")
    return _parse(row)


@router.put("/{key}", response_model=AmcPageSectionOut)
def update_section(
    key: str,
    payload: AmcPageSectionUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    seed_amc_page(db)
    row = db.query(AmcPageSection).filter(AmcPageSection.key == key).first()
    if not row:
        raise HTTPException(status_code=404, detail="Section not found")
    if payload.label is not None:
        row.label = payload.label
    row.data = json.dumps(payload.data, ensure_ascii=False)
    db.commit()
    db.refresh(row)
    return _parse(row)
