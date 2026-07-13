from app.services.docker_service import docker_service
from app.parsers.nmap_parser import nmap_parser


class NmapScanner:

    def scan(self, target: str, profile: str):

        if profile == "quick":
            command = f"nmap -T4 -F -oX - {target}"

        elif profile == "full":
            command = f"nmap -A -p- -T4 -oX - {target}"

        else:
            command = f"nmap -sV -oX - {target}"

        xml = docker_service.exec(command)
        print(xml)

        return nmap_parser.parse(xml)
    

nmap_scanner = NmapScanner()