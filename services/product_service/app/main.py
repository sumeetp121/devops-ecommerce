from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Product Catalog Service")
class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str

products = [
    {
        "id": 1,
        "name": "Laptop",
        "description": "15-inch business laptop",
        "price": 75000,
        "category": "Electronics",
    },
    {
        "id": 2,
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse",
        "price": 1500,
        "category": "Accessories",
    },
    {
        "id": 3,
        "name": "Keyboard",
        "description": "Mechanical keyboard",
        "price": 3500,
        "category": "Accessories",
    },
]


@app.get("/")
def root():
    return {"message": "Product Catalog Service is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/products")
def get_products():
    return products

@app.post("/products")
def create_product(product: Product):
    products.append(product.model_dump())
    return product

@app.get("/products/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product

    raise HTTPException(status_code=404, detail="Product not found")