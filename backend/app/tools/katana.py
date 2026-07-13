import json

from app.services.docker_service import docker_service
from app.parsers.katana_parser import katana_parser


class KatanaScanner:

    def scan(self, target: str):

        command = (
            f"katana "
            f"-u {target} "
            f"-j "
            f"-silent "
            f"-depth 3 "
            f"-js-crawl "
            f"-jsluice "
            f"-timeout 20 "
            f"-retry 2"
        )

        output = docker_service.exec(command)

        # Keep this only while debugging
        print("========== KATANA ==========")
        print(output)
        print("============================")

        results = []

        for line in output.splitlines():

            line = line.strip()

            if not line.startswith("{"):
                continue

            try:
                results.append(json.loads(line))
            except json.JSONDecodeError:
                continue

        return katana_parser.parse(results)


katana_scanner = KatanaScanner()