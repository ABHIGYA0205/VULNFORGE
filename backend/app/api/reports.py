from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.scan import Scan

router = APIRouter()


@router.get("/reports")
def reports():

    db = SessionLocal()

    scans = db.scalars(
        select(Scan)
        .where(Scan.status == "completed")
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


@router.get("/reports/{scan_id}")
def report(scan_id: str):

    db = SessionLocal()

    scan = db.get(Scan, scan_id)

    db.close()

    if scan is None:
        raise HTTPException(404, "Report not found")

    return scan.results


@router.get("/reports/{scan_id}/json")
def download_json(scan_id: str):

    db = SessionLocal()

    scan = db.get(Scan, scan_id)

    db.close()

    if scan is None:
        raise HTTPException(404, "Report not found")

    return JSONResponse(
        content=scan.results,
        headers={
            "Content-Disposition":
                f'attachment; filename="{scan.target}.json"'
        },
    )


@router.delete("/reports/{scan_id}")
def delete_report(scan_id: str):

    db = SessionLocal()

    scan = db.get(Scan, scan_id)

    if scan is None:
        db.close()
        raise HTTPException(404, "Report not found")

    db.delete(scan)

    db.commit()

    db.close()

    return {
        "success": True
    }