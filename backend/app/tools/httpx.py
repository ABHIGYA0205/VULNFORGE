import json

from app.services.docker_service import docker_service
from app.parsers.httpx_parser import httpx_parser


class HTTPXScanner:

    def scan(self, target: str):

        command = (
            "httpx "
            "-silent "
            "-json "
            "-title "
            "-status-code "
            "-web-server "
            "-ip "
            "-cdn "
            f"-u {target}"
        )

        output = docker_service.exec(command)

        json_line = None

        for line in reversed(output.splitlines()):
            line = line.strip()

            if line.startswith("{") and line.endswith("}"):
                json_line = line
                break

        if not json_line:
            raise Exception(f"HTTPX returned no JSON:\n{output}")

        data = json.loads(json_line)

        return httpx_parser.parse(data)


httpx_scanner = HTTPXScanner()