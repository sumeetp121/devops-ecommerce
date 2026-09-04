from fastapi.testclient import TestClient

from services.product_service.app.main import app


client = TestClient(app)


def test_get_products():
    response = client.get("/products")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_product():
    new_product = {
        "name": "Test Laptop",
        "description": "Test laptop",
        "price": 75000,
        "category": "Electronics",
    }

    create_response = client.post("/products", json=new_product)

    assert create_response.status_code == 200

    product_id = create_response.json()["id"]

    response = client.get(f"/products/{product_id}")

    assert response.status_code == 200
    assert response.json()["name"] == "Test Laptop"


def test_product_not_found():
    response = client.get("/products/999")

    assert response.status_code == 404

def test_create_product():
    new_product = {
        "name": "Monitor",
        "description": "24-inch monitor",
        "price": 12000,
        "category": "Electronics",
    }

    response = client.post("/products", json=new_product)

    assert response.status_code == 200
    assert response.json()["id"] is not None
    assert response.json()["name"] == "Monitor"
    assert response.json()["price"] == 12000

def test_create_product_validation():
    invalid_product = {
        "name": "Test",
        "description": "Test product",
        "price": "hello",
        "category": "Test",
    }

    response = client.post("/products", json=invalid_product)

    assert response.status_code == 422

def test_update_product():
    new_product = {
        "name": "Laptop",
        "description": "Business laptop",
        "price": 75000,
        "category": "Electronics",
    }

    create_response = client.post("/products", json=new_product)

    assert create_response.status_code == 200

    product_id = create_response.json()["id"]

    updated_product = {
        "name": "Gaming Laptop",
        "description": "High-performance gaming laptop",
        "price": 95000,
        "category": "Electronics",
    }

    response = client.put(
        f"/products/{product_id}",
        json=updated_product,
    )

    assert response.status_code == 200
    assert response.json()["id"] == product_id
    assert response.json()["name"] == "Gaming Laptop"
    assert response.json()["price"] == 95000


def test_delete_product():
    new_product = {
        "name": "Keyboard",
        "description": "Mechanical keyboard",
        "price": 3500,
        "category": "Accessories",
    }

    create_response = client.post("/products", json=new_product)

    assert create_response.status_code == 200

    product_id = create_response.json()["id"]

    response = client.delete(f"/products/{product_id}")

    assert response.status_code == 200
    assert response.json()["id"] == product_id
    assert response.json()["name"] == "Keyboard"

    get_response = client.get(f"/products/{product_id}")

    assert get_response.status_code == 404