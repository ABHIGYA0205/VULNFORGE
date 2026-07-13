from app.tools.nmap import nmap_scanner
from app.tools.whatweb import whatweb_scanner
from app.tools.httpx import httpx_scanner
from app.tools.headers import header_scanner
from app.tools.ffuf import ffuf_scanner
from app.tools.nuclei import nuclei_scanner
from app.tools.katana import katana_scanner
from app.services.ai_summary import ai_summary
from app.db.session import SessionLocal
from app.models.scan import Scan
from app.tools.sslscan import ssl_scanner

class QuickPipeline:

    WEB_PORTS = {
        80,
        443,
        8080,
        8000,
        8443,
        8888,
        3000,
        5000,
    }
    def update_scan(self, job):

        db = SessionLocal()

        scan = db.get(Scan, job.id)

        if scan:

            scan.progress = job.progress
            scan.current_tool = job.current_tool
            scan.results = job.results

            db.commit()

        db.close()

    def execute(self, job):

        # ---------------- Nmap ---------------- #

        job.current_tool = "Nmap"
        job.progress = 10

        job.results["nmap"] = nmap_scanner.scan(
            job.target,
            job.profile
        )
        self.update_scan(job)

        ports = job.results["nmap"].get("ports", [])

        web_detected = any(
            p["port"] in self.WEB_PORTS and p["state"] == "open"
            for p in ports
        )

        if not web_detected:
            job.progress = 100
            job.current_tool = "Done"
            return

        # ---------------- WhatWeb ---------------- #

        job.current_tool = "WhatWeb"
        job.progress = 30

        job.results["whatweb"] = whatweb_scanner.scan(
            job.target
        )
        self.update_scan(job)
        # ---------------- HTTPX ---------------- #

        job.current_tool = "HTTPX"
        job.progress = 50

        job.results["httpx"] = httpx_scanner.scan(
            job.target
        )
        self.update_scan(job)
        # ---------------- Security Headers ---------------- #

        job.current_tool = "Headers"
        job.progress = 65

        job.results["headers"] = header_scanner.scan(
            job.target
        )
        self.update_scan(job)
        # ---------------- SSl ---------------- #
        job.current_tool = "SSL"
        job.progress = 72

        job.results["ssl"] = ssl_scanner.scan(
            job.target
        )

        self.update_scan(job)
        # ---------------- FFUF ---------------- #

        job.current_tool = "FFUF"
        job.progress = 80

        job.results["directories"] = ffuf_scanner.scan(
            job.target
        )  
        self.update_scan(job) 
         # ---------------- Katana ---------------- #
        job.current_tool = "Katana"
        job.progress = 92

        job.results["endpoints"] = katana_scanner.scan(
            job.target
        )
        self.update_scan(job)
        # ---------------- Nuclei ---------------- #

        job.current_tool = "Nuclei"
        job.progress = 95

        job.results["vulnerabilities"] = nuclei_scanner.scan(
            job.target
        )
        self.update_scan(job)

        # ---------------- Finished ---------------- #

        job.current_tool = "Done"
        job.progress = 100
        job.results["summary"] = ai_summary.generate(
            job.results
        )
        self.update_scan(job)


quick_pipeline = QuickPipeline()
