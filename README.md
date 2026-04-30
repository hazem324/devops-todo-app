#  TaskFlow - Full Stack DevOps Project

##  Overview

**TaskFlow** is a full-stack web application built with a modern DevOps-oriented architecture.

It combines:

*  **Frontend**: Angular 18 (served via Nginx)
*  **Backend**: Spring Boot (Java 21, REST API)
*  **Database**: MySQL
*  **Containerization**: Docker & Docker Compose
*  **CI/CD**: Jenkins Pipeline + SonarQube
*  **Orchestration**: Kubernetes (Minikube)

---

##  Project Structure

```
.
├── k8s/                      # Kubernetes manifests
│   ├── backend-deployment.yml
│   ├── backend-service.yml
│   ├── frontend-deployment.yml
│   ├── frontend-service.yml
│   ├── db-deployment.yml
│   ├── db-service.yml
│   ├── ingress.yml
│   ├── namespace.yml
│   ├── pv.yml
│   └── pvc.yml
│
├── taskFlow/                 # Angular frontend
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── todo-backend/             # Spring Boot backend
│   ├── src/
│   ├── mvnw
│   └── pom.xml
│
├── docker-compose.yml        # Local environment setup
├── Jenkinsfile               # CI/CD pipeline
└── README.md
```

---

##  Technologies Used

| Layer         | Technology             |
| ------------- | ---------------------- |
| Frontend      | Angular 18             |
| Backend       | Spring Boot (Java 21)  |
| Database      | MySQL                  |
| CI/CD         | Jenkins, SonarQube     |
| Containers    | Docker, Docker Compose |
| Orchestration | Kubernetes (Minikube)  |
| Web Server    | Nginx                  |

---

#  Run Locally (Without Docker)

##  1. Clone Repository

```bash
git clone https://github.com/hazem324/devops-todo-app.git
cd devops-todo-app
```

---

##  2. Run Frontend (Angular 18)

```bash
cd taskFlow
npm install
ng serve
```

👉 Application runs on:

```
http://localhost:4200
```

---

##   Run Backend (Spring Boot - Java 21)

###  Prerequisites

* Java 21 installed
* Maven (or use wrapper)

```bash
cd todo-backend
./mvnw spring-boot:run
```

 Backend runs on:

```
http://localhost:8080
```

---

##  4. Run Database (MySQL)

You can run MySQL locally or via Docker:

```bash
docker run -d \
  --name mysql-taskflow \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=taskflow \
  -p 3306:3306 \
  mysql:8
```

---

#  Run with Docker (Recommended)

```bash
docker-compose up --build
```

 Services:

* Frontend → http://localhost
* Backend → http://localhost:8080
* Database → MySQL container

---

#  Kubernetes Deployment

##  Apply all resources

```bash
kubectl apply -f k8s/
```

---

##  Verify deployment

```bash
kubectl get pods
kubectl get services
kubectl get ingress
```

---

##  Access Application

```
http://<minikube-ip>
```

---

#  CI/CD Pipeline (Jenkins)

Pipeline stages:

1.  Backend build & tests (Maven)
2.  Frontend tests (Karma)
3.  SonarQube analysis
4.  Docker image build
5.  Kubernetes deployment

---

##  Code Quality

* Integrated with **SonarQube**
* Ensures:

  * Code quality
  * Maintainability
  * Bug detection

---

##  Architecture

```
User
  ↓
Ingress (Kubernetes)
  ↓
Frontend (Angular + Nginx)
  ↓
Backend (Spring Boot API)
  ↓
MySQL (Persistent Volume)
```

---

##  Key Features

*  Role-based access (Angular Guards)
*  RESTful API (Spring Boot)
*  DTO + Mapper architecture
*  Persistent storage (K8s PV/PVC)
*  CI/CD automation (Jenkins)
*  Code quality analysis (SonarQube)

---

##  Important Notes

* Database uses **Persistent Volume** → data is not lost after pod restart
* Frontend is served via **Nginx**
* Backend follows **layered architecture**:

  ```
  Controller → Service → Repository → DTO
  ```
* Ensure frontend API URL matches backend configuration (`environment.ts`)

---

##  Author

Developed as part of a DevOps & Full Stack project.

---

##  Future Improvements

*  JWT Authentication (Spring Security)
*  Monitoring (Prometheus + Grafana)
*  Cloud deployment (AWS / Azure)
*  Kubernetes auto-scaling

---
