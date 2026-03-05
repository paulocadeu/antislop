# ANTISLOP - Project Context

## Project Overview
ANTISLOP is a multi-tenant SaaS application focusing on a clean and robust architecture. The backend is built with **NestJS** and **TypeScript**, following **Hexagonal Architecture (Ports and Adapters)** principles. It uses **PostgreSQL** (v18) as the primary database with **TypeORM** for object-relational mapping.

## Tech Stack
- **Language:** TypeScript
- **Backend Framework:** NestJS
- **Database:** PostgreSQL (v18 via Docker)
- **ORM:** TypeORM
- **Runtime:** Node.js (Primary)
- **API Documentation:** Swagger (`@nestjs/swagger`)
- **Authentication:** Passport.js with JWT and Refresh Token Rotation.
- **Validation:** `class-validator`, `class-transformer`.
- **Testing:** Jest (Unit, Integration, and E2E) + Gherkin BDD.
- **Mail:** Maildev for local development, Nodemailer for production.
## Project Status (March 2026)
- [x] **Architecture Blueprint:** Layers and responsibilities defined.
- [x] **Database Design:** IAM module ERD completed (Polymorphic contacts, JSONB RBAC).
- [x] **Functional Spec:** 21 IAM Use Cases detailed technically.
- [x] **Behavioral Spec:** 21 BDD (Gherkin) scenarios for IAM completed.
- [x] **Technical Setup:** NestJS project initialization, Husky, Jest-Cucumber.
- [🏗️] **Reference Implementation:** IAM Identity Subdomain (Unit Tests complete).

## Architecture
...
## Testing Strategy (Outside-In TDD/BDD)

Adotamos um fluxo rigoroso de desenvolvimento guiado por testes para garantir integridade arquitetural:

1.  **Passo 1: BDD (Red)** - Definir comportamento em Gherkin (`.feature`) e criar teste E2E falhando.
2.  **Passo 2: Domínio (Red-Green)** - Implementar regras de negócio na `Entity` ou `Value Object` via TDD.
3.  **Passo 3: Aplicação (Red-Green)** - Implementar `Use Case` com mocks para os `Ports`.
4.  **Passo 4: Infraestrutura (Red-Green)** - Implementar `Adapters` (TypeORM, Services) com testes de integração.
5.  **Passo 5: BDD (Green)** - Finalizar `Presentation` (Controller) e validar o fluxo completo.

### Infraestrutura de Teste
- **DatabaseCleaner:** Limpeza automática do banco entre testes de integração.
- **TestAppInstance:** Singleton para gerenciar o NestJS em testes E2E.
- **Factories:** Padrão *Object Mother* (ex: `UserFactory`) para geração de dados de teste.

## Project Structure

- **Core (Domain/Application):** Contains business logic, entities, and use cases. It remains agnostic of external frameworks (with minor concessions for NestJS decorators).
- **Adapters (Infrastructure/Presentation):** Implementations for external interfaces (persistence, HTTP controllers, external APIs).
- **Ports:** Interfaces that define how the core interacts with the outside world.
- **Detailed Structure:** See `docs/backend/architecture/folder_structure.md`.

## Project Structure
- `backend/`: NestJS application source code and Docker configuration.
- `frontend/`: (Currently empty) Placeholder for the frontend application.
- `docs/`: Technical documentation, including Architectural Decisions (DET.md) and module-specific ERDs.
- `infra/`: Infrastructure as Code (IaC) and local development orchestration (`docker-compose.yml`).
- `tasks/`: Checklists and progress tracking.

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
1.  **Identity and Access Management (IAM):** Handles users, organizations (tenants), roles (RBAC), and authentication.
    - **Specs:** `docs/backend/modules/01_IAM/README.md`.
    - **ERD:** `docs/backend/modules/01_IAM/ERD_IAM.md`.
    - **BDD:** `docs/backend/modules/01_IAM/bdd/`.

## Shared Logic Memories
- **Invitations:** The invitation creation endpoint is centralized at `POST /v1/invitations` in the Shared module, using `CreateInvitationUseCase`, to keep the invitation system agnostic.
- **Isolation:** Domain entities MUST be isolated from TypeORM entities via Mappers.
- **RBAC:** Organization roles use `JSONB` for flexible permission sets.

## Development Conventions
- Follow **Clean Code** and **SOLID** principles.
- Maintain strict isolation of the **Core** layer.
- Use **Mappers** to translate between persistence entities and domain entities.
- **Validation:** Use `class-validator` in DTOs and business rules in Domain.
- **BDD:** Use Gherkin scenarios as the source of truth for behavior and acceptance tests.
- Ensure all new features are accompanied by tests.
