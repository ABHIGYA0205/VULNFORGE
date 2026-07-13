from sqlalchemy import Boolean, Integer, String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.db.base import Base


class Settings(Base):

    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(primary_key=True)

    threads: Mapped[int] = mapped_column(Integer, default=50)

    timeout: Mapped[int] = mapped_column(Integer, default=10)

    wordlist: Mapped[str] = mapped_column(
        String,
        default="common.txt"
    )

    ai_enabled: Mapped[bool] = mapped_column(
        Boolean,
        default=True
    )