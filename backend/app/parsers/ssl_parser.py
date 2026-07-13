import re


class SSLParser:

    def parse(self, output):

        result = {
            "subject": "",
            "issuer": "",
            "expires": "",
            "protocols": [],
            "ciphers": []
        }

        subject = re.search(r"Subject:\s*(.+)", output)
        issuer = re.search(r"Issuer:\s*(.+)", output)
        expiry = re.search(r"Not valid after:\s*(.+)", output)

        if subject:
            result["subject"] = subject.group(1).strip()

        if issuer:
            result["issuer"] = issuer.group(1).strip()

        if expiry:
            result["expires"] = expiry.group(1).strip()

        for line in output.splitlines():

            if "TLSv" in line and "Accepted" in line:

                result["protocols"].append(line.strip())

            if "Preferred" in line:

                result["ciphers"].append(line.strip())

        return result


ssl_parser = SSLParser()