from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy import JSON
from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base import Base


class Scan(Base):

    __tablename__ = "scans"

    id: Mapped[str] = mapped_column(String, primary_key=True)

    target: Mapped[str] = mapped_column(String)

    status: Mapped[str] = mapped_column(String)

    progress: Mapped[int] = mapped_column(Integer)

    current_tool: Mapped[str] = mapped_column(String)

    results: Mapped[dict] = mapped_column(JSON)

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )