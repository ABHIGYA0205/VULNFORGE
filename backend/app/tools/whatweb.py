import json
import uuid

from app.services.docker_service import docker_service
from app.parsers.whatweb_parser import whatweb_parser


class WhatWebScanner:

    def scan(self, target: str):

        filename = f"/tmp/{uuid.uuid4()}.json"

        command = (
            f"whatweb --log-json={filename} {target} >/dev/null 2>&1; "
            f"cat {filename}; "
            f"rm -f {filename}"
        )

        output = docker_service.exec(command)

        print(output)

        data = json.loads(output)

        return whatweb_parser.parse(data)


whatweb_scanner = WhatWebScanner()