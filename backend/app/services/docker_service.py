import docker


class DockerService:

    def __init__(self):
        self.client = docker.from_env()

    def ping(self):
        try:
            self.client.ping()
            return True
        except Exception:
            return False

    def exec(self, command: str):

        container = self.client.containers.get(
            "vulnforge-scanner"
        )

        result = container.exec_run(
            ["bash", "-c", command]
        )

        return result.output.decode()


docker_service = DockerService()