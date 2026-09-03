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

def test_create_product():
    new_product = {
        "id": 5,
        "name": "Monitor",
        "description": "24-inch monitor",
        "price": 12000,
        "category": "Electronics",
    }

    response = client.post("/products", json=new_product)

    assert response.status_code == 200
    assert response.json()["name"] == "Monitor"
    assert response.json()["price"] == 12000

def test_create_product_validation():
    invalid_product = {
        "id": "abc",
        "name": "Test",
        "description": "Test product",
        "price": "hello",
        "category": "Test",
    }

    response = client.post("/products", json=invalid_product)

    assert response.status_code == 422

def test_update_product():
    updated_product = {
        "id": 1,
        "name": "Gaming Laptop",
        "description": "High-performance gaming laptop",
        "price": 95000,
        "category": "Electronics",
    }

    response = client.put("/products/1", json=updated_product)

    assert response.status_code == 200
    assert response.json()["name"] == "Gaming Laptop"
    assert response.json()["price"] == 95000


def test_delete_product():
    response = client.delete("/products/3")

    assert response.status_code == 200
    assert response.json()["name"] == "Keyboard"