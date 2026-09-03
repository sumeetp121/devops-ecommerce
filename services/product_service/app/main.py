from fastapi import FastAPI

app = FastAPI(title="Product Catalog Service")


@app.get("/")
def root():
    return {"message": "Product Catalog Service is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}