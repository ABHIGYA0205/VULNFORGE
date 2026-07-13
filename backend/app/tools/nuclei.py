import json

from app.services.docker_service import docker_service
from app.parsers.nuclei_parser import nuclei_parser


class NucleiScanner:

    def scan(self, target: str):

        command = (
            f"nuclei "
            f"-u http://{target} "
            f"-jsonl "
            f"-silent "
            f"-stats "
            f"-retries 2 "
            f"-timeout 15"
        )

        output = docker_service.exec(command)

        findings = []

        for line in output.splitlines():

            line = line.strip()

            if line.startswith("{"):
                findings.append(json.loads(line))

        return nuclei_parser.parse(findings)


nuclei_scanner = NucleiScanner()