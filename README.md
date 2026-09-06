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
                         DEVOPS E-COMMERCE PROJECT
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Local Development│
                         └────────┬────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
        Python/FastAPI       Node.js              Java/Spring Boot
             │                 Frontend                │
             └────────────────────┼────────────────────┘
                                  ▼
                           PostgreSQL
                           SQLAlchemy
                                  │
             ┌────────────────────┼────────────────────┐
             ▼                    ▼                    ▼
           Redis                Kafka                 gRPC
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ▼
                           Docker / Compose
                                  │
                                  ▼
                         Kubernetes / Minikube
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
                              Argo CD
                              GitOps
                                  │
                                  ▼
                          GitHub Actions
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

## Milestone 10 — E-Commerce Website & Admin Dashboard

Built the first complete local e-commerce application by connecting the frontend, Product Catalog API, and PostgreSQL database.

### Storefront

Implemented a modern dark-mode e-commerce storefront with:

- Product listing
- Product categories
- Product search
- Product filtering
- Product cards
- Shopping cart
- Cart quantity management
- Cart persistence using browser local storage
- Responsive design
- Hover effects and modern UI interactions
- Product data loaded dynamically from the Product Catalog API

### Admin Dashboard

Implemented a product management dashboard with:

- Product listing
- Product count
- Add product
- Edit product
- Delete product
- Product category management
- Product price management
- Product description management
- Refresh catalog
- Success/error notifications
- Responsive admin interface

### Application Flow

```text
Browser
   |
   v
Node.js Frontend
   |
   v
Product Catalog API
   |
   v
FastAPI
   |
   v
PostgreSQL
```

## The Node.js frontend provides API proxy endpoints for the Product Catalog service.

## Supported operations:

- GET     /api/products
- GET     /api/products/:id
- POST    /api/products
- PUT     /api/products/:id
- DELETE  /api/products/:id
---

# Current Local Application

## Storefront:

http://localhost:3000

## Admin Dashboard:

http://localhost:3000/admin.html

## Product Catalog API:

http://localhost:8000

## Swagger API Documentation:

http://localhost:8000/docs

---

## Milestone 11 — Docker Containerization & PostgreSQL Networking

Containerized the Product Catalog service and PostgreSQL database using Docker.

### Product Catalog Container

Implemented a Docker image for the Product Catalog service using:

* Python 3.12 slim base image
* FastAPI
* Uvicorn
* SQLAlchemy
* PostgreSQL driver
* Environment-based database configuration
* Port 8000 exposed by the container

Docker image:

```text
devops-ecommerce-product-service:v1
```

### PostgreSQL Container

Created a PostgreSQL 16 container with:

* PostgreSQL 16
* Dedicated Docker volume for persistent database storage
* `ecommerce_db` database
* `ecommerce_app` database user

Docker volume:

```text
postgres-data
```

### Docker Networking

Created a dedicated Docker bridge network:

```text
ecommerce-network
```

Connected the Product Catalog service and PostgreSQL containers to the same network.

The Product Catalog service connects to PostgreSQL using the Docker service name:

```text
DB_HOST=postgres
```

Docker's internal DNS resolves:

```text
postgres → PostgreSQL container
```

### Application Flow

```text
Browser
   |
   v
Host Port 8000
   |
   v
Product Service Container
   |
   | Docker Network
   v
PostgreSQL Container
   |
   v
postgres-data volume
```

### Verification

Successfully verified:

* Product Catalog container starts successfully
* PostgreSQL container starts successfully
* Docker DNS resolves the PostgreSQL container
* Product Service connects to PostgreSQL over the Docker network
* Existing product database was restored into the PostgreSQL container
* Product API successfully returns all 35 products
* `/health` endpoint returns healthy status

This milestone demonstrates container-to-container communication, Docker networking, persistent volumes and database-backed application deployment.

---

## Milestone 12 — Docker Compose

Replaced the manually created Docker containers with Docker Compose to define and manage the Product Catalog service and PostgreSQL database as a single application stack.

### Docker Compose Configuration

Created a `compose.yaml` file defining:

* Product Catalog service
* PostgreSQL 16 database
* Docker network
* Persistent PostgreSQL volume
* Environment-based database configuration
* Product Service port mapping
* Service dependency using `depends_on`

### Environment Configuration

Database credentials and connection settings are stored in the local `.env` file instead of being hardcoded in `compose.yaml`.

The `.env` file is excluded from Git using `.gitignore`.

Compose reads the following variables:

```text
DB_USER
DB_PASSWORD
DB_NAME
DB_HOST
DB_PORT
```

The Product Service connects to PostgreSQL using:

```text
DB_HOST=postgres
```

### Persistent Storage

Configured PostgreSQL to use the existing external Docker volume:

```text
postgres-data
```

This ensures that PostgreSQL data persists even when the containers are removed and recreated.

### Docker Network

Docker Compose creates a dedicated network for communication between the services:

```text
devops-ecommerce_ecommerce-network
```

The Product Service communicates with PostgreSQL through the Docker service name:

```text
product-service
      |
      | Docker Network
      v
postgres
```

PostgreSQL port `5432` is kept internal and is not exposed to the host.

### Compose Application Flow

```text
compose.yaml
      |
      ├── Product Service
      |       |
      |       v
      |   FastAPI
      |       |
      |       | Docker Network
      |       v
      |   PostgreSQL
      |       |
      |       v
      |   postgres-data
      |
      └── Port 8000
              |
              v
        Host / Browser
```

### Verification

Successfully verified:

* `docker compose config` validates the Compose configuration
* Environment variables are loaded from `.env`
* Product Service container starts successfully
* PostgreSQL container starts successfully
* Docker Compose creates the application network
* Existing `postgres-data` volume is reused
* PostgreSQL data remains persistent
* Product Service connects to PostgreSQL using Docker DNS
* PostgreSQL port `5432` remains internal
* Product API successfully returns all 35 products
* Unused duplicate Compose volume was safely removed

This milestone demonstrates declarative container orchestration using Docker Compose, environment-based configuration, persistent storage, service discovery and multi-container application management.

---

# Milestone 13 — Full Docker Compose Stack

## Overview

Completed the Docker Compose integration for the e-commerce application by adding the **Frontend service** to the existing PostgreSQL and Product Catalog services.

The complete local application stack now runs using Docker Compose.

## Architecture

```text
                    Docker Compose
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Frontend       Product Service     PostgreSQL
     :3000              :8000             :5432
        │                │
        │                │
        └── HTTP ────────┘
             Docker DNS
        product-service:8000
```

All services communicate through the Docker Compose network:

```text
devops-ecommerce_ecommerce-network
```

## Frontend Service

The frontend is built using **Node.js + Express**.

Dockerfile:

```text
services/frontend/Dockerfile
```

The Docker image is built from:

```text
node:22-slim
```

The container exposes:

```text
3000
```

Docker Compose publishes:

```text
Host 3000 → Container 3000
```

## Product Service Communication

The frontend does not use `localhost` to communicate with the Product Service.

Instead, Docker Compose service-name DNS is used:

```text
PRODUCT_SERVICE_URL=http://product-service:8000
```

This allows the frontend container to communicate directly with the Product Service container over the Compose network.

## PostgreSQL

PostgreSQL continues to use the existing external Docker volume:

```text
postgres-data
```

This ensures the existing product data is preserved when containers are recreated.

The Product Service connects to PostgreSQL using the Docker service name:

```text
DB_HOST=postgres
```

## Docker Compose Configuration

The Compose stack now contains three services:

```text
postgres
product-service
frontend
```

The services are connected to:

```text
ecommerce-network
```

Compose creates the project-scoped network:

```text
devops-ecommerce_ecommerce-network
```

## Verification

The complete request path was successfully tested:

```text
Browser
   ↓
Frontend :3000
   ↓
Product Service :8000
   ↓
PostgreSQL :5432
```

The following API request successfully returned all **35 products**:

```bash
curl http://localhost:3000/api/products
```

This verified:

* Frontend container is running.
* Frontend port `3000` is accessible.
* Frontend can resolve `product-service` through Docker DNS.
* Frontend can communicate with Product Service.
* Product Service can communicate with PostgreSQL.
* Existing PostgreSQL data is available.

## Troubleshooting Performed

During testing, the frontend initially failed to communicate with the Product Service.

Investigation showed that the frontend and Product Service were attached to different Docker networks.

Network inspection was performed using:

```bash
docker network inspect ecommerce-network
```

and:

```bash
docker inspect product-service
```

The frontend was then tested against the correct Compose network.

A temporary frontend container was subsequently removed and recreated through Docker Compose, which resulted in the correct network attachment and successful communication.

## Key DevOps Learning

### Container-to-container communication

Inside Docker Compose, containers should communicate using **service names**, not host `localhost`.

Incorrect:

```text
http://localhost:8000
```

Correct:

```text
http://product-service:8000
```

Similarly, the Product Service connects to PostgreSQL using:

```text
postgres:5432
```

rather than:

```text
localhost:5432
```

# The Architecture Built:

```text
                         Ubuntu VM
                            │
                         Docker
                            │
             ┌──────────────┴──────────────┐
             │     Docker Compose          │
             │                             │
             │   ecommerce-network         │
             │                             │
             │  ┌───────────────┐          │
Browser ────►│  │   Frontend    │          │
localhost    │  │     :3000     │          │
:3000        │  └───────┬───────┘          │
             │          │                  │
             │          │ product-service  │
             │          │ :8000            │
             │          ▼                  │
             │  ┌───────────────┐          │
             │  │    Product    │          │
             │  │    Service    │          │
             │  │     :8000     │          │
             │  └───────┬───────┘          │
             │          │                  │
             │          │ postgres:5432    │
             │          ▼                  │
             │  ┌───────────────┐          │
             │  │  PostgreSQL   │          │
             │  │     :5432     │          │
             │  └───────┬───────┘          │
             │          │                  │
             └──────────┼──────────────────┘
                        ▼
                 postgres-data
                    volume

```

## Files Added/Updated

```text
compose.yaml
services/frontend/Dockerfile
```

## Git Milestone

**Milestone 13: Complete Docker Compose frontend integration**

Commit:

```text
Complete Docker Compose frontend integration
```

Changes were committed and pushed to the GitHub `main` branch.

## Current Status

The project has progressed from a basic FastAPI service to a complete local Docker + Kubernetes deployment.

### Completed

* ✅ Git repository
* ✅ GitHub repository
* ✅ Project structure
* ✅ README
* ✅ Python Product Catalog microservice
* ✅ REST API
* ✅ CRUD operations
* ✅ Pydantic validation
* ✅ Automated tests
* ✅ PostgreSQL installation
* ✅ PostgreSQL database
* ✅ Product database table
* ✅ SQLAlchemy
* ✅ Environment-based database configuration
* ✅ SQLAlchemy Product model
* ✅ Python → SQLAlchemy → PostgreSQL connectivity
* ✅ PostgreSQL-backed Product API
* ✅ Database test isolation/fixtures
* ✅ Product Catalog containerization
* ✅ Docker Compose
* ✅ Frontend containerization
* ✅ Frontend → Product Service communication
* ✅ Kubernetes/Minikube deployment
* ✅ Kubernetes PostgreSQL persistent storage
* ✅ Product Service Kubernetes Deployment and Service
* ✅ Frontend Kubernetes Deployment and Service
* ✅ NGINX Ingress
* ✅ Product database backup and restore into Kubernetes PostgreSQL
* ✅ 35 existing products verified in Kubernetes PostgreSQL
* ✅ Kubernetes resource requests and limits
* ✅ Docker images pushed to Docker Hub
* ✅ Complete local Kubernetes application verified end to end

### Current Milestone

**Milestone 14 — Local Kubernetes Deployment**

The complete application is now running locally on Minikube:

```text
Browser
   │
   ▼
NGINX Ingress
   │
   ▼
Frontend Service
   │
   ▼
Frontend Pod
   │
   ▼
Product Service
   │
   ▼
PostgreSQL
   │
   ▼
Persistent Storage
```

The storefront renders successfully and the frontend can retrieve the 35 products from the Product Catalog service.

### Next Milestone

**Milestone 15 — Redis**

Redis will be added and integrated locally before moving to Kafka, gRPC, Java/Spring Boot and the cloud phases.

---

# Complete Project Roadmap

The project follows the agreed progression:

```text
LOCAL DEVELOPMENT
        │
        ▼
Docker / Docker Compose
        │
        ▼
Kubernetes / Minikube
        │
        ▼
Redis
        │
        ▼
Kafka
        │
        ▼
gRPC
        │
        ▼
Java / Spring Boot
        │
        ▼
Helm
        │
        ▼
GitHub Actions
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
Argo CD
        │
        ▼
GitOps
```

Each major stage will be implemented, tested and verified before moving to the next stage.

## Phase 1 — Local Application Foundation

- ✅ FastAPI Product Catalog service
- ✅ PostgreSQL
- ✅ SQLAlchemy
- ✅ REST CRUD API
- ✅ Node.js/Express frontend
- ✅ Docker
- ✅ Docker Compose
- ✅ Kubernetes/Minikube
- ✅ Kubernetes persistent storage
- ✅ NGINX Ingress

## Phase 2 — Redis

- [ ] Deploy Redis locally
- [ ] Integrate Redis with the Product Catalog service
- [ ] Implement product caching
- [ ] Test cache hit/miss behavior
- [ ] Add Redis Kubernetes configuration
- [ ] Verify Redis service communication

## Phase 3 — Apache Kafka

- [ ] Deploy Kafka locally
- [ ] Learn brokers, topics, partitions and consumers
- [ ] Create product-related events
- [ ] Implement producer/consumer flow
- [ ] Test event-driven communication
- [ ] Deploy Kafka components to Kubernetes

## Phase 4 — gRPC

- [ ] Define protobuf contracts
- [ ] Generate client/server code
- [ ] Build a selected internal gRPC API
- [ ] Test REST and gRPC communication
- [ ] Integrate gRPC with Kubernetes services

## Phase 5 — Java / Spring Boot

- [ ] Build a Java/Spring Boot microservice
- [ ] Add REST endpoints
- [ ] Connect Spring Boot to PostgreSQL
- [ ] Integrate it with existing services
- [ ] Add selected gRPC communication
- [ ] Containerize the Spring Boot service
- [ ] Deploy it to Kubernetes

## Phase 6 — Helm

- [ ] Learn Helm charts
- [ ] Convert Kubernetes manifests into Helm templates
- [ ] Create `values.yaml`
- [ ] Parameterize images, replicas, resources and service settings
- [ ] Install and upgrade the application using Helm
- [ ] Test Helm rollback
- [ ] Validate the complete application locally through Helm

## Phase 7 — GitHub Actions

- [ ] Create CI workflow
- [ ] Run automated tests
- [ ] Validate application configuration
- [ ] Build Docker images
- [ ] Push images to Docker Hub initially
- [ ] Prepare the workflow for AWS/ECR

## Phase 8 — Terraform

- [ ] Learn Terraform fundamentals
- [ ] Providers, resources, variables and outputs
- [ ] Terraform state
- [ ] Modules
- [ ] AWS networking infrastructure
- [ ] IAM infrastructure
- [ ] EKS infrastructure as code

## Phase 9 — AWS / EKS

- [ ] Create AWS networking
- [ ] Create IAM roles and policies
- [ ] Create EKS cluster
- [ ] Configure EKS worker/node infrastructure
- [ ] Create ECR repositories
- [ ] Push application images to ECR
- [ ] Deploy the application to EKS
- [ ] Validate networking, storage and service communication

## Phase 10 — Argo CD / GitOps

- [ ] Install Argo CD
- [ ] Connect Argo CD to GitHub
- [ ] Store deployment configuration in Git
- [ ] Configure Helm-based application deployment
- [ ] Configure Argo CD synchronization
- [ ] Deploy the application to EKS using GitOps
- [ ] Test Git commit → Argo CD sync → EKS deployment

## Phase 11 — Final CI/CD + GitOps

Final target flow:

```text
Developer
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Test
    ├── Build
    ├── Docker Image
    └── Push Image → ECR
                         │
                         ▼
                        AWS
                         │
                         ▼
                        EKS
                         │
                         ▼
                       Argo CD
                         │
                         ▼
                       Helm
                         │
                         ▼
                      GitOps
```

### Responsibility split

```text
GitHub Actions
    → CI
    → Test
    → Build
    → Publish container images

Argo CD
    → CD
    → GitOps
    → Kubernetes desired-state synchronization
    → Deploy to EKS
```

This project will use **GitHub Actions instead of Jenkins**.

---

# Milestone Sequence

```text
01  Project Foundation                        ✅
02  Product Catalog Service                   ✅
03  Automated Testing                         ✅
04  PostgreSQL Setup                          ✅
05  Python → PostgreSQL Connectivity          ✅
06  SQLAlchemy Product Model                  ✅
07  PostgreSQL-Backed Product API             ✅
08  API Response Schemas                      ✅
09  Database Test Isolation                   ✅
10  E-Commerce Website & Admin Dashboard      ✅
11  Docker Containerization                   ✅
12  Docker Compose                            ✅
13  Full Docker Compose Stack                 ✅
14  Kubernetes / Minikube                     ✅
15  Redis                                     ⏳ NEXT
16  Kafka                                     ⏳
17  gRPC                                      ⏳
18  Java / Spring Boot                        ⏳
19  Helm                                      ⏳
20  GitHub Actions                            ⏳
21  Terraform                                 ⏳
22  AWS                                       ⏳
23  EKS                                       ⏳
24  Argo CD                                   ⏳
25  GitOps                                    ⏳
26  Final CI/CD + GitOps Architecture         ⏳
```

---

# Important Project Rule

The project will **not jump directly to AWS**.

We will first make the application complete and stable locally:

```text
Application
   ↓
Redis
   ↓
Kafka
   ↓
gRPC
   ↓
Java/Spring Boot
   ↓
Helm
   ↓
Local Kubernetes validation
```

Only after the local stack is working will we move to:

```text
Terraform
   ↓
AWS
   ↓
EKS
   ↓
ECR
   ↓
Argo CD
   ↓
GitOps
```

This keeps the project practical and ensures that every technology is understood before it becomes part of the cloud architecture.

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
