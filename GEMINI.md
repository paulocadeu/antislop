# ANTISLOP - Project Context

## Project Overview
ANTISLOP is a web application focusing on a clean and robust architecture. The backend is built with **NestJS** and **TypeScript**, following **Hexagonal Architecture (Ports and Adapters)** principles. It uses **PostgreSQL** as the primary database with **TypeORM** for object-relational mapping.

## Tech Stack
- **Language:** TypeScript
- **Backend Framework:** NestJS
- **Database:** PostgreSQL (v18 via Docker)
- **ORM:** TypeORM
- **Runtime:** Node.js (Primary)
- **API Documentation:** Swagger (`@nestjs/swagger`)
- **Authentication:** Passport.js (`@nestjs/passport`)
- **Validation:** `class-validator`, `class-transformer`
- **Testing:** Jest (Unit and Integration)
- **Mail:** Maildev for local development, Nodemailer for production.

## Architecture
The project strictly adheres to **Hexagonal Architecture**:
- **Core:** Contains business logic, entities, and use cases. It should remain agnostic of external frameworks (with minor concessions for NestJS decorators).
- **Adapters:** Implementations for external interfaces (persistence, HTTP controllers, external APIs).
- **Ports:** Interfaces that define how the core interacts with the outside world.

## Project Structure
- `backend/`: NestJS application source code and Docker configuration.
- `frontend/`: (Currently empty) Placeholder for the frontend application.
- `docs/`: Technical documentation, including Architectural Decisions (DET.md) and module-specific ERDs.
- `infra/`: Infrastructure as Code (IaC) and local development orchestration (`docker-compose.yml`).

## Development Workflow

### Prerequisites
- Docker and Docker Compose
- Node.js (Latest LTS recommended)

### Local Environment Setup
The development environment is containerized using Docker Compose.

```bash
# Start the development environment
cd infra
docker compose up -d

# Stop the development environment
docker compose down
```

The `docker-compose.yml` provides:
- `api`: The NestJS backend (runs in `sleep infinity` mode by default for manual control).
- `database`: PostgreSQL 18 instance.
- `maildev`: Local SMTP server and Web UI for email testing (Port 1080).

### Key Modules
1.  **Identity and Access Management (IAM):** Handles users, organizations, roles (RBAC), and authentication.
    - Documented in `docs/backend/modules/01_IAM/ERD_IAM.md`.

## Development Conventions
- Follow **Clean Code** and **SOLID** principles.
- Maintain isolation of the **Core** layer.
- Use **Mappers** to translate between persistence entities and domain entities.
- Ensure all new features are accompanied by tests.
