from dataclasses import dataclass, field
from typing import Any
import time


@dataclass
class ScanJob:
    id: str
    target: str
    profile: str

    status: str = "queued"
    progress: int = 0
    current_tool: str = "Waiting"

    started_at: float = field(default_factory=time.time)
    finished_at: float | None = None

    results: dict[str, Any] = field(default_factory=dict)