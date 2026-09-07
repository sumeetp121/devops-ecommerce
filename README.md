# DevOps E-Commerce Platform

A hands-on DevOps project built to understand how a real application moves from local development to a containerized and Kubernetes-based deployment, and finally to AWS.

The application is intentionally kept simple. The main objective of this project is to learn how to build, package, deploy, automate, monitor, and operate an application using modern DevOps tools.

---

## Project Goal

The goal of this project is to build a small e-commerce application and take it through a complete DevOps lifecycle:

```text
   Application
    ↓
   Python / FastAPI
    ↓
   Docker
    ↓
   Docker Compose
    ↓
   Kubernetes
    ↓
   Helm
    ↓
   CI/CD
    ↓
   AWS
    ↓
Monitoring & Operations
````

The same application should first work completely on a local Ubuntu machine and then be deployed to AWS.

---

# Objectives

The project is designed to provide practical experience with:

* Linux
* Git and GitHub
* Python application basics
* Docker
* Docker Compose
* PostgreSQL
* Redis
* Kubernetes
* Helm
* GitHub Actions / CI/CD
* Terraform
* Ansible
* AWS
* Monitoring and logging
* Application deployment
* Troubleshooting
* Infrastructure automation

The focus is on understanding **how these technologies work together** in a real deployment.

---

# Application Overview

The application is a simple e-commerce platform.

The application provides a product catalog where users can:

* View products
* View a single product
* Create a product
* Update a product
* Delete a product

The application uses:

```text
Frontend
   ↓
Product Service
   ↓
PostgreSQL
   ↓
 Redis
```

Kafka is also used for application events.

For example, when a product is created:

```text
User
 ↓
Product Service
 ↓
PostgreSQL
 ↓
Kafka
 ↓
Product Event
```

The application logic remains intentionally simple so that the main focus stays on DevOps and infrastructure.

---

# Technology Stack

## Application

* Python
* FastAPI
* SQLAlchemy

## Database

* PostgreSQL

## Cache

* Redis

## Messaging

* Apache Kafka

## Containerization

* Docker
* Docker Compose

## Container Orchestration

* Kubernetes
* Minikube

## Kubernetes Package Management

* Helm

## CI/CD

* GitHub Actions

## Infrastructure as Code

* Terraform

## Configuration Management

* Ansible

## Cloud

* AWS

## Version Control

* Git
* GitHub

## Monitoring and Logging

Planned tools include:

* Prometheus
* Grafana
* Kubernetes logs
* Application logs

---

# Repository Structure

Current project structure:

```text
devops-ecommerce/
├── services/
│   ├── product_service/
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── database.py
│   │   │   ├── models.py
│   │   │   ├── schemas.py
│   │   │   ├── redis_client.py
│   │   │   └── kafka_producer.py
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   └── frontend/
│       ├── ...
│       └── Dockerfile
├── kubernetes/
│   ├── ...
├── helm/
│   └── ...
├── terraform/
│   └── ...
├── docker-compose.yml
├── .gitignore
└── README.md
```

The directory structure will grow as the project progresses.

---

# Current Application

The main application is a FastAPI-based Product Catalog Service.

The application exposes REST APIs.

## Health Check

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{
  "status": "healthy"
}
```

---

# Product APIs

## Get All Products

```bash
curl http://localhost:8000/products
```

---

## Get Product

```bash
curl http://localhost:8000/products/1
```

Example:

```json
{
  "id": 1,
  "name": "ProBook X1 Laptop",
  "description": "14-inch business laptop with high-performance processor and 16GB RAM.",
  "price": 74999.0,
  "category": "Laptops"
}
```

---

## Create Product

```bash
curl -X POST http://localhost:8000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Laptop",
    "description": "Test product",
    "price": 50000,
    "category": "Laptops"
  }'
```

---

## Update Product

```bash
curl -X PUT http://localhost:8000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "description": "Updated product",
    "price": 55000,
    "category": "Laptops"
  }'
```

---

## Delete Product

```bash
curl -X DELETE http://localhost:8000/products/1
```

---

# Local Development

The project uses a Python virtual environment for application development.

Activate the environment:

```bash
source .venv/bin/activate
```

Check Python:

```bash
python --version
```

Check installed packages:

```bash
pip list
```

---

# Running the Application Locally

Start the FastAPI application:

```bash
uvicorn services.product_service.app.main:app \
  --host 0.0.0.0 \
  --port 8000
```

The application will be available at:

```text
http://localhost:8000
```

FastAPI documentation:

```text
http://localhost:8000/docs
```

---

# Docker

The application is containerized using Docker.

Build the image:

```bash
docker build \
  -t devops-product-service:v1 \
  services/product_service
```

Check the image:

```bash
docker images
```

Run the container:

```bash
docker run -d \
  --name product-service \
  -p 8000:8000 \
  devops-product-service:v1
```

Check the container:

```bash
docker ps
```

Check logs:

```bash
docker logs product-service
```

Stop the container:

```bash
docker stop product-service
```

Remove the container:

```bash
docker rm product-service
```

---

# Docker Compose

Docker Compose will be used to run the complete local application stack.

Expected architecture:

```text
                Docker Compose
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    Frontend    Product API   PostgreSQL
                     │
                     ├──────── Redis
                     │
                     └──────── Kafka
```

Start the complete stack:

```bash
docker compose up -d
```

Check services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

View logs for one service:

```bash
docker compose logs product-service
```

Stop the stack:

```bash
docker compose down
```

---

# Kubernetes

After Docker works correctly, the application will be deployed to Kubernetes.

The local Kubernetes environment is:

```text
Minikube
```

Start Minikube:

```bash
minikube start
```

Check cluster:

```bash
kubectl get nodes
```

Expected:

```text
NAME       STATUS   ROLES           AGE
minikube   Ready    control-plane   ...
```

---

# Kubernetes Namespace

The application runs inside the:

```text
ecommerce
```

namespace.

Create the namespace:

```bash
kubectl create namespace ecommerce
```

Check namespaces:

```bash
kubectl get namespaces
```

---

# Kubernetes Deployment

The application is deployed using Kubernetes manifests.

Typical resources include:

```text
Deployment
Service
ConfigMap
Secret
PersistentVolume
PersistentVolumeClaim
```

Apply Kubernetes manifests:

```bash
kubectl apply -f kubernetes/
```

Check deployments:

```bash
kubectl -n ecommerce get deployments
```

Check pods:

```bash
kubectl -n ecommerce get pods
```

Check services:

```bash
kubectl -n ecommerce get svc
```

---

# Kubernetes Troubleshooting Commands

Check pod details:

```bash
kubectl -n ecommerce describe pod <pod-name>
```

View logs:

```bash
kubectl -n ecommerce logs <pod-name>
```

Follow logs:

```bash
kubectl -n ecommerce logs -f <pod-name>
```

Check deployment:

```bash
kubectl -n ecommerce describe deployment <deployment-name>
```

Check events:

```bash
kubectl -n ecommerce get events
```

Execute a command inside a container:

```bash
kubectl -n ecommerce exec -it <pod-name> -- sh
```

---

# Kubernetes Port Forwarding

For local testing:

```bash
kubectl -n ecommerce port-forward \
  svc/product-service 8000:8000
```

Test:

```bash
curl http://localhost:8000/health
```

---

# Helm

Helm will be used to package the Kubernetes application.

Instead of maintaining many individual Kubernetes commands, Helm will provide a reusable deployment package.

Expected structure:

```text
helm/
└── ecommerce/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── deployment.yaml
        ├── service.yaml
        ├── configmap.yaml
        └── secret.yaml
```

Install the application:

```bash
helm install ecommerce ./helm/ecommerce \
  -n ecommerce
```

Check Helm releases:

```bash
helm list -n ecommerce
```

Upgrade:

```bash
helm upgrade ecommerce ./helm/ecommerce \
  -n ecommerce
```

Uninstall:

```bash
helm uninstall ecommerce -n ecommerce
```

---

# Kafka

Kafka is used for application events.

The current event flow is:

```text
Product Service
      │
      │ Product Created
      ▼
Kafka Topic
product-events
      │
      ▼
Consumer
```

Create the topic:

```bash
kafka-topics.sh \
  --bootstrap-server kafka:9094 \
  --create \
  --topic product-events \
  --partitions 1 \
  --replication-factor 1
```

List topics:

```bash
kafka-topics.sh \
  --bootstrap-server kafka:9094 \
  --list
```

Kafka will be managed as part of the Kubernetes environment.

---

# Redis

Redis is used as a cache for product data.

The application caches:

```text
products
product:<id>
```

The cache has a short expiration time.

When product data changes, the relevant cache is cleared.

This provides practical experience with:

* Application caching
* Cache invalidation
* Redis
* Kubernetes service discovery

---

# PostgreSQL

PostgreSQL is the primary database for the application.

The application stores product information such as:

```text
ID
Name
Description
Price
Category
```

Database configuration is provided to the application through environment variables and Kubernetes configuration.

---

# Terraform

Terraform will be used for Infrastructure as Code.

The project will first use Terraform for local infrastructure and then move toward AWS infrastructure.

Planned AWS infrastructure includes:

```text
VPC
├── Public Subnets
├── Private Subnets
├── Security Groups
├── Internet Gateway
├── NAT Gateway
└── Compute / Kubernetes infrastructure
```

Typical Terraform workflow:

```bash
terraform init
```

```bash
terraform validate
```

```bash
terraform plan
```

```bash
terraform apply
```

Destroy test infrastructure when required:

```bash
terraform destroy
```

---

# Ansible

Ansible will be used for configuration management and server automation.

Planned tasks include:

* Server configuration
* Package installation
* User management
* Service configuration
* Application configuration
* Basic security configuration

Typical workflow:

```bash
ansible-playbook -i inventory site.yml
```

---

# CI/CD

GitHub Actions will be used to automate the application delivery process.

Planned pipeline:

```text
Git Push
   ↓
GitHub Actions
   ↓
Checkout Code
   ↓
Run Tests
   ↓
Build Docker Image
   ↓
Tag Image
   ↓
Push Image
   ↓
Deploy to Kubernetes
   ↓
Verify Deployment
```

The goal is to remove manual deployment steps.

---

# AWS Deployment

Once the application is working correctly on the local Kubernetes cluster, it will be deployed to AWS.

The AWS architecture will be introduced gradually.

Planned components include:

```text
AWS
│
├── VPC
│
├── Subnets
│
├── Security Groups
│
├── IAM
│
├── Compute
│
├── Container Registry
│
└── Kubernetes
```

The exact AWS services will be selected as the project progresses.

The important objective is to understand:

```text
Local Kubernetes
       ↓
AWS Infrastructure
       ↓
AWS Kubernetes / Containers
       ↓
Production-style Deployment
```

---

# Monitoring

Monitoring will be added after the application and deployment pipeline are stable.

Planned monitoring areas:

### Application

* HTTP health
* Request failures
* Response time
* Application errors

### Kubernetes

* Pod status
* Pod restarts
* CPU usage
* Memory usage
* Deployment status

### Infrastructure

* CPU
* Memory
* Disk
* Network

Planned tools:

```text
Prometheus
Grafana
```

---

# Logging

Application and infrastructure logs will be collected and investigated during troubleshooting.

Important commands:

```bash
kubectl logs
```

```bash
kubectl describe
```

```bash
kubectl get events
```

The objective is to understand how to troubleshoot an application running inside containers and Kubernetes.

---

# Git Workflow

Git is used for version control.

Check repository status:

```bash
git status
```

Check changes:

```bash
git diff
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update application"
```

Push:

```bash
git push
```

Check history:

```bash
git log --oneline
```

The `main` branch represents the stable project state.

---

# Project Development Approach

The project will be developed in small stages.

Each stage must work before moving to the next stage.

```text
   Stage 1
   Application
       ↓
   Stage 2
   Database
       ↓
   Stage 3
   Redis
       ↓
   Stage 4
   Kafka
       ↓
   Stage 5
   Docker
       ↓
   Stage 6
   Docker Compose
       ↓
   Stage 7
   Kubernetes
       ↓
   Stage 8
   Helm
       ↓
   Stage 9
   GitHub Actions / CI/CD
       ↓
   Stage 10
   Terraform
       ↓
   Stage 11
   AWS
       ↓
   Stage 12
   Monitoring
```

The application should remain simple while the infrastructure becomes progressively more realistic.

---

# Completed

## Application

* [x] FastAPI application created
* [x] Product API created
* [x] Product CRUD operations implemented
* [x] PostgreSQL integration
* [x] Redis integration
* [x] Health endpoint
* [x] Kafka producer integration
* [x] Kafka topic created
* [x] Kafka event successfully published
* [x] Kafka event successfully consumed
* [x] Application tested locally

## Docker

* [x] Product service Dockerfile
* [x] Docker image created
* [x] Containerized application tested

## Kubernetes

* [x] Minikube environment
* [x] Ecommerce namespace
* [x] Product service deployed
* [x] PostgreSQL deployed
* [x] Redis deployed
* [x] Kafka deployed
* [x] Kubernetes Services configured
* [x] Internal service communication tested
* [x] Product API tested through Kubernetes

## Helm

* [ ] Helm chart completed
* [ ] Helm deployment tested
* [ ] Helm upgrade tested
* [ ] Helm rollback tested

---

# Current Status

The application is currently running successfully in the local Kubernetes environment.

Current architecture:

```text
                 Kubernetes
                 Minikube
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
   Product API   PostgreSQL    Redis
        │
        │
        ▼
      Kafka
        │
        ▼
 product-events
```

The next major objective is to make the Kubernetes deployment clean and repeatable using Helm.

---

# Next Steps

## Step 1 — Finish Helm

Create a proper Helm chart for the application.

Tasks:

* [ ] Create Helm chart
* [ ] Move Kubernetes configuration into Helm templates
* [ ] Create `values.yaml`
* [ ] Deploy using Helm
* [ ] Test Helm upgrade
* [ ] Test Helm rollback

---

## Step 2 — Docker Compose

Create a complete local Docker Compose environment.

Tasks:

* [ ] Product service
* [ ] PostgreSQL
* [ ] Redis
* [ ] Kafka
* [ ] Network configuration
* [ ] Environment variables
* [ ] Health checks

---

## Step 3 — CI/CD

Create GitHub Actions pipeline.

Tasks:

* [ ] Git checkout
* [ ] Application validation
* [ ] Docker build
* [ ] Image tagging
* [ ] Kubernetes deployment
* [ ] Deployment verification

---

## Step 4 — Terraform

Build AWS infrastructure using Terraform.

Tasks:

* [ ] AWS provider
* [ ] VPC
* [ ] Subnets
* [ ] Route tables
* [ ] Security groups
* [ ] IAM
* [ ] Compute infrastructure
* [ ] Container registry
* [ ] Kubernetes infrastructure

---

## Step 5 — AWS Deployment

Deploy the application to AWS.

Tasks:

* [ ] Push Docker image to AWS container registry
* [ ] Deploy application
* [ ] Configure networking
* [ ] Configure security
* [ ] Configure DNS / access
* [ ] Test application

---

## Step 6 — Monitoring

Add monitoring and dashboards.

Tasks:

* [ ] Prometheus
* [ ] Grafana
* [ ] Application metrics
* [ ] Kubernetes metrics
* [ ] CPU monitoring
* [ ] Memory monitoring
* [ ] Pod restart monitoring
* [ ] Basic alerts

---

# Final Target Architecture

The final project should look approximately like this:

```text
                         GitHub
                            │
                            ▼
                         GitHub Actions
                            │
                    Build & Test
                            │
                            ▼
                       Docker Image
                            │
                            ▼
                       AWS Registry
                            │
                            ▼
                    AWS Kubernetes
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
      Frontend         Product Service     Other Services
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          PostgreSQL      Redis          Kafka
                                           │
                                           ▼
                                    Product Events
                                          
                            │
                            ▼
                    Prometheus / Grafana
```

---

# Project Philosophy

The application is intentionally simple.

The purpose of the project is to understand the complete journey of an application:

```text
Write
  ↓
Test
  ↓
Package
  ↓
Containerize
  ↓
Deploy
  ↓
Automate
  ↓
Monitor
  ↓
Troubleshoot
  ↓
Scale
```

The final goal is not to build a complicated e-commerce product.

The final goal is to gain practical experience in **deploying and operating an application using DevOps tools and cloud infrastructure**.

---

# Environment

Current development environment:

```text
OS       : Ubuntu
Python   : 3.12
Kubernetes: Minikube
Container Runtime: Docker
Cloud Target: AWS
```

---

# Project Status

```text
Application       ████████████████████  Complete
PostgreSQL        ████████████████████  Complete
Redis             ████████████████████  Complete
Kafka             ████████████████████  Complete
Docker            ████████████████████  Complete
Kubernetes        ████████████████████  Complete
Helm              ███████░░░░░░░░░░░░░  In Progress
CI/CD             ░░░░░░░░░░░░░░░░░░░░  Planned
Terraform         ░░░░░░░░░░░░░░░░░░░░  Planned
AWS               ░░░░░░░░░░░░░░░░░░░░  Planned
Monitoring        ░░░░░░░░░░░░░░░░░░░░  Planned
```

---

### Author: Sumeet Patel


