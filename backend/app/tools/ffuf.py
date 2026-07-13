import json

from app.services.docker_service import docker_service
from app.parsers.ffuf_parser import ffuf_parser


class FFUFScanner:

    WORDLIST = "/wordlists/common.txt"

    def scan(self, target: str):

        command = (
            f"ffuf "
            f"-u http://{target}/FUZZ "
            f"-w {self.WORDLIST} "
            f"-mc 200,204,301,302,307,401,403 "
            f"-fs 0 "
            f"-ac "
            f"-of json "
            f"-o /tmp/ffuf.json "
            f"-noninteractive "
            f"> /dev/null 2>&1 ; "
            f"cat /tmp/ffuf.json"
        )

        output = docker_service.exec(command)

        print("OUTPUT LENGTH:", len(output))
        print(output[:300])

        data = json.loads(output)

        return ffuf_parser.parse(data)


ffuf_scanner = FFUFScanner()