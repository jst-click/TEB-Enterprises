import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, HomepageSection
from ..schemas import HomepagePublic, HomepageSectionOut, HomepageSectionUpdate
from ..seed_homepage import seed_homepage

router = APIRouter(prefix="/api/homepage", tags=["homepage"])


def _parse(row: HomepageSection) -> HomepageSectionOut:
    try:
        data = json.loads(row.data or "{}")
    except json.JSONDecodeError:
        data = {}
    return HomepageSectionOut(
        id=row.id,
        key=row.key,
        label=row.label,
        sort_order=row.sort_order,
        data=data if isinstance(data, dict) else {},
        updated_at=row.updated_at,
    )


@router.get("/public", response_model=HomepagePublic)
def public_homepage(db: Session = Depends(get_db)):
    seed_homepage(db)
    rows = db.query(HomepageSection).order_by(HomepageSection.sort_order.asc()).all()
    return HomepagePublic(sections={row.key: _parse(row).data for row in rows})


@router.get("/", response_model=list[HomepageSectionOut])
def list_sections(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    seed_homepage(db)
    rows = db.query(HomepageSection).order_by(HomepageSection.sort_order.asc()).all()
    return [_parse(row) for row in rows]


@router.get("/{key}", response_model=HomepageSectionOut)
def get_section(key: str, db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    seed_homepage(db)
    row = db.query(HomepageSection).filter(HomepageSection.key == key).first()
    if not row:
        raise HTTPException(status_code=404, detail="Section not found")
    return _parse(row)


@router.put("/{key}", response_model=HomepageSectionOut)
def update_section(
    key: str,
    payload: HomepageSectionUpdate,
    db: Session = Depends(get_db),
    _: Admin = Depends(get_current_admin),
):
    seed_homepage(db)
    row = db.query(HomepageSection).filter(HomepageSection.key == key).first()
    if not row:
        raise HTTPException(status_code=404, detail="Section not found")
    if payload.label is not None:
        row.label = payload.label
    row.data = json.dumps(payload.data, ensure_ascii=False)
    db.commit()
    db.refresh(row)
    return _parse(row)
