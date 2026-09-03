import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile

from ..auth import get_current_admin
from ..config import settings
from ..models import Admin

router = APIRouter(prefix="/api/uploads", tags=["uploads"])

ALLOWED = {".jpg", ".jpeg", ".png", ".webp", ".gif"}


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
    _: Admin = Depends(get_current_admin),
):
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in ALLOWED:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    upload_root = settings.upload_path
    name = f"{uuid.uuid4().hex}{suffix}"
    dest = upload_root / name
    content = await file.read()
    dest.write_bytes(content)
    return {"url": f"/uploads/{name}"}
