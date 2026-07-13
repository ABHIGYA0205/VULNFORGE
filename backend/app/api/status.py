from fastapi import APIRouter
from app.services.docker_service import docker_service

router = APIRouter(prefix="/status", tags=["Status"])

@router.get("/")
def status():
    return {
        "backend": "online",
        "docker": docker_service.ping()
    }
@router.get("/exec")
def exec_test():

    output = docker_service.exec("nmap scanme.nmap.org")

    return {
        "output": output
    }