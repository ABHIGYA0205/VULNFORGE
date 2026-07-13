import xml.etree.ElementTree as ET


class NmapParser:

    def parse(self, xml_data: str):
        print("===== XML RECEIVED =====")
        print(xml_data)

        root = ET.fromstring(xml_data)

        result = {
            "host": "",
            "ports": []
        }

        host = root.find("host")

        if host is None:
            return result

        address = host.find("address")

        if address is not None:
            result["host"] = address.attrib.get("addr")

        ports = host.find("ports")

        if ports is None:
            return result

        for port in ports.findall("port"):

            state = port.find("state")
            service = port.find("service")

            result["ports"].append({

                "port": int(port.attrib["portid"]),

                "protocol": port.attrib["protocol"],

                "state": state.attrib.get("state")
                if state is not None else "",

                "service": service.attrib.get("name")
                if service is not None else ""

            })

        return result


nmap_parser = NmapParser()