from app.services.docker_service import docker_service


class SSLScanner:

    def scan(self, target):

        output = docker_service.exec(
            f"sslscan {target}"
        )

        return output


ssl_scanner = SSLScanner()