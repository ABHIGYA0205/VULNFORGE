from fastapi import APIRouter
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.scan import Scan

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    db = SessionLocal()

    scans = db.scalars(
        select(Scan)
        .order_by(Scan.created_at.desc())
    ).all()

    db.close()

    total = len(scans)

    running = sum(s.status == "running" for s in scans)

    completed = sum(s.status == "completed" for s in scans)

    failed = sum(s.status == "failed" for s in scans)

    critical = 0

    recent = []

    for scan in scans:

        vulns = scan.results.get("vulnerabilities", [])

        for vuln in vulns:

            if vuln.get("severity") == "critical":
                critical += 1

        recent.append({
            "id": scan.id,
            "target": scan.target,
            "status": scan.status,
            "progress": scan.progress,
        })

    return {
        "total": total,
        "running": running,
        "completed": completed,
        "failed": failed,
        "critical": critical,
        "recent": recent[:10],
    }