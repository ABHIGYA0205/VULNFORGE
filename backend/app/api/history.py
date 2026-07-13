from fastapi import APIRouter
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.scan import Scan

router = APIRouter()


@router.get("/history")
def history():

    db = SessionLocal()

    scans = db.scalars(
        select(Scan)
        .where(Scan.status != "running")
        .order_by(Scan.created_at.desc())
    ).all()

    db.close()

    return [
        {
            "id": scan.id,
            "target": scan.target,
            "status": scan.status,
            "progress": scan.progress,
        }
        for scan in scans
    ]