from sqlalchemy import create_engine

DATABASE_URL = "postgresql://vulnforge:vulnforge@127.0.0.1:5432/vulnforge"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    echo=True,
)