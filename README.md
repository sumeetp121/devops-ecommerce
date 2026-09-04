# DevOps E-Commerce Platform

End-to-End DevOps implementation of a production-style polyglot microservices e-commerce platform.

The project is being built progressively from **local development → containers → Kubernetes → AWS → EKS → GitOps → CI/CD**.

---

## Project Goal

Build and deploy a production-style e-commerce microservices platform while implementing DevOps practices end to end.

The project covers:

* Microservices development
* REST and gRPC communication
* PostgreSQL and Redis
* Kafka event-driven communication
* Docker and Docker Compose
* Kubernetes and Helm
* Terraform infrastructure as code
* AWS and EKS
* GitHub Actions CI/CD
* Argo CD GitOps
* Monitoring, logging, security and troubleshooting

---

## Technology Stack

| Area               | Technology                          |
| ------------------ | ----------------------------------- |
| Backend            | Python, Node.js, Java / Spring Boot |
| Python Framework   | FastAPI                             |
| Database           | PostgreSQL                          |
| ORM                | SQLAlchemy                          |
| Cache              | Redis                               |
| Messaging          | Apache Kafka                        |
| API                | REST, selected gRPC                 |
| Containers         | Docker, Docker Compose              |
| Orchestration      | Kubernetes, Minikube                |
| Package Management | Helm                                |
| Infrastructure     | Terraform                           |
| Cloud              | AWS                                 |
| CI/CD              | GitHub Actions                      |
| GitOps             | Argo CD                             |
| Source Control     | Git / GitHub                        |

---

## Development Approach

```text
Local Development
       │
       ▼
Docker
       │
       ▼
Kubernetes
       │
       ▼
AWS
       │
       ▼
EKS
       │
       ▼
GitOps
       │
       ▼
CI/CD
```

The project is intentionally developed in stages so that each layer can be tested and understood before moving to the next one.

---

# Current Architecture

The project is currently in the **Product Catalog Service + PostgreSQL** stage.

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Product Catalog API │
                │       FastAPI       │
                └──────────┬──────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  SQLAlchemy │
                    │     ORM     │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │ PostgreSQL  │
                    │ ecommerce_db│
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  products   │
                    │    table    │
                    └─────────────┘
```

---

# Repository Structure

```text
devops-ecommerce/
│
├── services/
│   └── product_service/
│       ├── app/
│       │   ├── __init__.py
│       │   ├── database.py
│       │   ├── main.py
│       │   ├── models.py
│       │   └── __init__.py
│       │
│       └── tests/
│           └── test_products.py
│
├── infrastructure/
│   ├── terraform/
│   └── kubernetes/
│
├── gitops/
│
├── .github/
│   └── workflows/
│
├── docs/
│
├── .gitignore
├── pytest.ini
└── README.md
```

> The repository structure will expand as additional microservices and infrastructure components are added.

---

# Implemented Milestones

## Milestone 1 — Project Foundation

Completed:

* Created the Git repository
* Connected the project to GitHub
* Configured Git user
* Created project `.gitignore`
* Created Python virtual environment
* Established the initial project structure
* Added project README

---

## Milestone 2 — Product Catalog Service

Created the first microservice using **Python + FastAPI**.

Implemented:

* FastAPI application
* Root endpoint
* Health endpoint
* Product listing endpoint
* Product lookup endpoint
* Product creation endpoint
* Product update endpoint
* Product deletion endpoint
* Pydantic request validation
* HTTP 404 handling
* HTTP 422 validation handling
* Swagger/OpenAPI documentation

### Current API

```text
GET     /
GET     /health
GET     /products
GET     /products/{product_id}
POST    /products
PUT     /products/{product_id}
DELETE  /products/{product_id}
```

---

## Milestone 3 — Automated Testing

Added automated tests using **pytest** and FastAPI's test client.

Test coverage includes:

* Product listing
* Product retrieval
* Product not found
* Product creation
* Invalid product validation
* Product update
* Product deletion

Current test result:

```text
7 passed
```

---

## Milestone 4 — PostgreSQL Setup

PostgreSQL was installed and configured locally.

Completed:

* PostgreSQL 16 installation
* Created `ecommerce_db` database
* Created `ecommerce_app` application user
* Configured password authentication
* Configured local TCP database access
* Granted required database/schema privileges
* Created the `products` table

### Product Database Schema

```text
products
├── id          INTEGER PRIMARY KEY
├── name        VARCHAR(100) NOT NULL
├── description TEXT
├── price       NUMERIC(10,2) NOT NULL
└── category    VARCHAR(100) NOT NULL
```

The product ID is generated by PostgreSQL using a sequence.

---

## Milestone 5 — Python → PostgreSQL Connectivity

Added SQLAlchemy and PostgreSQL Python drivers.

Installed:

* SQLAlchemy
* psycopg2-binary
* python-dotenv

Implemented:

```text
FastAPI
   │
   ▼
SQLAlchemy
   │
   ▼
psycopg2
   │
   ▼
PostgreSQL
```

Database configuration is loaded through environment variables.

Example configuration:

```text
DB_USER
DB_PASSWORD
DB_HOST
DB_PORT
DB_NAME
```

Sensitive configuration is stored in `.env`, which is excluded from Git using `.gitignore`.

---

## Milestone 6 — SQLAlchemy Product Model

Created the SQLAlchemy `Product` model.

Current model mapping:

```text
Python Product Model
        │
        ▼
SQLAlchemy
        │
        ▼
products table
```

Verified:

* SQLAlchemy model imports successfully
* Model maps to the `products` table
* Expected columns are present
* SQLAlchemy can query PostgreSQL successfully

Current columns:

```text
id
name
description
price
category
```
---

## Milestone 7 — PostgreSQL-Backed Product API

Migrated the Product Catalog REST API from in-memory storage to PostgreSQL using SQLAlchemy.

Completed:

- GET `/products` using PostgreSQL
- GET `/products/{product_id}` using PostgreSQL
- POST `/products` using PostgreSQL
- PUT `/products/{product_id}` using PostgreSQL
- DELETE `/products/{product_id}` using PostgreSQL
- PostgreSQL-generated product IDs
- Separate API schemas (`ProductCreate`, `ProductResponse`)
- SQLAlchemy `Product` database model
- FastAPI database session dependency
- Removed the old in-memory product list
- Updated automated tests for database-backed behavior

### Data Flow

```text
Client
  │
  ▼
FastAPI REST API
  │
  ▼
Pydantic API Schema
  │
  ▼
SQLAlchemy ORM
  │
  ▼
PostgreSQL
  │
  ▼
products table
```

### Milestone 8 — Proper API Response Schemas

Improved the Product Catalog API by adding explicit FastAPI response schemas.

Changes:
- Added `ProductResponse` Pydantic schema.
- Added `response_model` to all Product API endpoints.
- Ensured API responses expose only the expected product fields.
- Added response validation through FastAPI/Pydantic.
- Verified all CRUD endpoints continue to work.
- Full automated test suite passes: **7 passed**.

API endpoints with response schemas:
- `GET /products`
- `POST /products`
- `GET /products/{product_id}`
- `PUT /products/{product_id}`
- `DELETE /products/{product_id}`

This establishes a cleaner API contract between the Product Catalog service and its consumers.

### Milestone 9 — Database Test Isolation

Improved the Product Catalog automated testing setup by separating test data from the development database.

Changes:
- Created a dedicated `ecommerce_test_db` PostgreSQL database.
- Added `pytest` database configuration through `conftest.py`.
- Automated tests now use the dedicated test database.
- Test tables are created automatically when the test suite starts.
- Test data is cleaned after each test.
- Test database tables are removed after the test session.
- Development database remains protected from automated test data.
- Full automated test suite passes: **7 passed**.

This provides a safer and cleaner foundation for automated testing before containerization and CI/CD.

---

# Current Status

The project has successfully progressed from a basic FastAPI service to a service connected to a real PostgreSQL database through SQLAlchemy.

### Completed

* [x] Git repository
* [x] GitHub repository
* [x] Project structure
* [x] README
* [x] Python Product Catalog microservice
* [x] REST API
* [x] CRUD operations
* [x] Pydantic validation
* [x] Automated tests
* [x] PostgreSQL installation
* [x] PostgreSQL database
* [x] Product database table
* [x] SQLAlchemy
* [x] Environment-based database configuration
* [x] SQLAlchemy Product model
* [x] Python → SQLAlchemy → PostgreSQL connectivity
* [x] Migrate Product API from in-memory data to PostgreSQL
* [x] Separate API schemas from database models
* [x] Add database CRUD operations
* [x] Update automated tests for PostgreSQL-backed API
* [x] Improve API response/schema handling
* [x] Add database test isolation/fixtures

### In Progress


- [ ] Containerize the Product Catalog service

---

# Upcoming Roadmap

```text
Product Service
      │
      ▼
PostgreSQL CRUD
      │
      ▼
Node.js Services
      │
      ▼
Java / Spring Boot Services
      │
      ▼
Docker
      │
      ▼
Docker Compose
      │
      ▼
Kafka + Redis
      │
      ▼
Kubernetes
      │
      ▼
Helm
      │
      ▼
Terraform
      │
      ▼
AWS
      │
      ▼
EKS
      │
      ▼
GitHub Actions
      │
      ▼
ECR
      │
      ▼
Argo CD
      │
      ▼
GitOps
```

---

# Development Philosophy

Each major implementation stage is:

1. Built locally
2. Tested
3. Verified
4. Documented
5. Committed to Git
6. Pushed to GitHub

This provides a complete history of the project's evolution and makes the repository easier to understand, review and use as a technical portfolio project.

---

# Local Development

The project currently runs locally on Ubuntu.

Python development uses the project's virtual environment:

```text
.venv/
```

Product Catalog API:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# Git Milestones

Major project changes are committed separately so the development history clearly reflects the implementation stages.

Examples:

```text
Initial Project Setup
Add project README.md
Add initial Product Catalog service
Add product catalog GET endpoints
Add product service automated tests
Add Product Catalog CRUD operations
Add PostgreSQL connectivity
Add SQLAlchemy product model
```

Future milestones will continue to be committed and pushed as the project evolves.
