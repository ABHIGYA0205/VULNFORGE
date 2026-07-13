from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import status, scan
from app.api import dashboard
from app.api import running
from app.api import history
from app.api import reports
from app.api import settings
from sqlalchemy import update
from app.db.session import SessionLocal
from app.models.scan import Scan


app = FastAPI(title="VulnForge")

@app.on_event("startup")
def cleanup_running_scans():

    db = SessionLocal()

    db.execute(
        update(Scan)
        .where(Scan.status == "running")
        .values(
            status="failed",
            current_tool="Interrupted"
        )
    )

    db.commit()

    db.close()
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(status.router)
app.include_router(scan.router)
app.include_router(dashboard.router)
app.include_router(running.router)
app.include_router(history.router)
app.include_router(reports.router)
app.include_router(settings.router)