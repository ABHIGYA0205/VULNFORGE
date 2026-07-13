from fastapi import APIRouter
from pydantic import BaseModel
from app.db.session import SessionLocal
from app.models.scan import Scan
from app.services.scan_manager import scan_manager
from fastapi import HTTPException
router = APIRouter(prefix="/scan", tags=["Scan"])


class ScanRequest(BaseModel):
    target: str
    profile: str


@router.post("/")
def start_scan(request: ScanRequest):

    return scan_manager.create_scan(
        request.target,
        request.profile
    )


@router.get("/{scan_id}")
def get_scan(scan_id: str):

    db = SessionLocal()

    scan = db.get(Scan, scan_id)

    db.close()

    if scan is None:
        raise HTTPException(status_code=404, detail="Scan not found")

    return {
        "id": scan.id,
        "target": scan.target,
        "status": scan.status,
        "progress": scan.progress,
        "current_tool": scan.current_tool,
        "results": scan.results,
    }