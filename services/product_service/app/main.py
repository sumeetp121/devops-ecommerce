from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from services.product_service.app.database import SessionLocal
from services.product_service.app.models import Product as ProductModel

app = FastAPI(title="Product Catalog Service")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str




@app.get("/")
def root():
    return {"message": "Product Catalog Service is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.get("/products", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).all()

@app.post("/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = ProductModel(
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db),
):
    db_product = (
        db.query(ProductModel)
        .filter(ProductModel.id == product_id)
        .first()
    )

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.name = product.name
    db_product.description = product.description
    db_product.price = product.price
    db_product.category = product.category

    db.commit()
    db.refresh(db_product)

    return db_product

@app.delete("/products/{product_id}", response_model=ProductResponse)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = (
        db.query(ProductModel)
        .filter(ProductModel.id == product_id)
        .first()
    )

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()

    return db_product