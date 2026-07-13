from fastapi import APIRouter
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.settings import Settings

router = APIRouter()


@router.get("/settings")
def get_settings():

    db = SessionLocal()

    settings = db.scalar(select(Settings))

    if settings is None:

        settings = Settings()

        db.add(settings)

        db.commit()

        db.refresh(settings)

    return {
        "threads": settings.threads,
        "timeout": settings.timeout,
        "wordlist": settings.wordlist,
        "ai_enabled": settings.ai_enabled,
    }


@router.put("/settings")
def update_settings(data: dict):

    db = SessionLocal()

    settings = db.scalar(select(Settings))

    if settings is None:

        settings = Settings()

        db.add(settings)

    settings.threads = data["threads"]
    settings.timeout = data["timeout"]
    settings.wordlist = data["wordlist"]
    settings.ai_enabled = data["ai_enabled"]

    db.commit()

    return {
        "success": True
    }