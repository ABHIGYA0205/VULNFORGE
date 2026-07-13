import uuid
import threading
import time

from app.models.scan_job import ScanJob
from app.tools.nmap import nmap_scanner
from app.pipeline.quick_scan import quick_pipeline
from app.db.session import SessionLocal
from app.models.scan import Scan


class ScanManager:

    def __init__(self):
        self.jobs = {}

    def create_scan(self, target, profile):

        job = ScanJob(
            id=str(uuid.uuid4()),
            target=target,
            profile=profile
        )
        db = SessionLocal()

        scan = Scan(
            id=job.id,
            target=job.target,
            status="queued",
            progress=0,
            current_tool="Waiting",
            results={}
        )

        db.add(scan)
        db.commit()
        db.close()

        self.jobs[job.id] = job

        threading.Thread(
            target=self.run_scan,
            args=(job,),
            daemon=True
        ).start()

        return {
            "scan_id": job.id,
            "status": job.status
        }

    def run_scan(self, job):

        try:
            db = SessionLocal()
            scan = db.get(Scan, job.id)

            job.status = "running"
            scan.status = "running"

            db.commit()

            quick_pipeline.execute(job)

            job.status = "completed"

            scan.status = "completed"
            scan.progress = 100
            scan.current_tool = "Done"
            scan.results = job.results

            db.commit()
            db.close()

        except Exception as e:
            import traceback

            traceback.print_exc()

            print("FFUF ERROR:", e)

            job.status = "failed"
            job.current_tool = "Error"
            job.error = str(e)


    def get_job(self, scan_id):

        return self.jobs.get(scan_id)


scan_manager = ScanManager()