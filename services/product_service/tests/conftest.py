import os

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

from services.product_service.app.database import Base
from services.product_service.app.main import app, get_db


TEST_DATABASE_URL = (
    f"postgresql+psycopg2://{os.getenv('DB_USER', 'ecommerce_app')}:"
    f"{os.getenv('DB_PASSWORD', 'devops123')}@"
    f"{os.getenv('DB_HOST', '127.0.0.1')}:"
    f"{os.getenv('DB_PORT', '5432')}/ecommerce_test_db"
)

test_engine = create_engine(TEST_DATABASE_URL)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=test_engine,
)


@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def client():
    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


@pytest.fixture(autouse=True)
def clean_database():
    yield

    db = TestingSessionLocal()
    try:
        for table in reversed(Base.metadata.sorted_tables):
            db.execute(table.delete())
        db.commit()
    finally:
        db.close()
