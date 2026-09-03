from fastapi import FastAPI, HTTPException

app = FastAPI(title="Product Catalog Service")


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

@app.get("/products/{product_id}")
def get_product(product_id: int):
    for product in products:
        if product["id"] == product_id:
            return product

    raise HTTPException(status_code=404, detail="Product not found")