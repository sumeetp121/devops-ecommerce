from fastapi.testclient import TestClient

from services.product_service.app.main import app


client = TestClient(app)


def test_get_products():
    response = client.get("/products")

    assert response.status_code == 200
    assert len(response.json()) >= 3


def test_get_product():
    response = client.get("/products/1")

    assert response.status_code == 200
    assert response.json()["name"] == "Laptop"


def test_product_not_found():
    response = client.get("/products/999")

    assert response.status_code == 404