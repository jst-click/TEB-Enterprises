from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..auth import get_current_admin
from ..database import get_db
from ..models import Admin, SiteSettings
from ..schemas import SettingsOut, SettingsPublic, SettingsUpdate

router = APIRouter(prefix="/api/settings", tags=["settings"])

DEFAULT_WHATSAPP = "917996688885"
DEFAULT_EMAIL = "sales@teamcleaningexperts.in"


def get_or_create_settings(db: Session) -> SiteSettings:
    row = db.query(SiteSettings).order_by(SiteSettings.id.asc()).first()
    if row:
        return row
    row = SiteSettings(whatsapp_number=DEFAULT_WHATSAPP, contact_email=DEFAULT_EMAIL)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


@router.get("/public", response_model=SettingsPublic)
def public_settings(db: Session = Depends(get_db)):
    row = get_or_create_settings(db)
    return SettingsPublic(whatsapp_number=row.whatsapp_number, contact_email=row.contact_email)


@router.get("/", response_model=SettingsOut)
def get_settings(db: Session = Depends(get_db), _: Admin = Depends(get_current_admin)):
    return get_or_create_settings(db)


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
    db.commit()
    db.refresh(row)
    return row
