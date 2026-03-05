# Checklist: Setup Inicial do Backend (NestJS)

Este checklist mapeia as tarefas necessárias para inicializar o projeto backend e configurar a base da Arquitetura Hexagonal.

## 1. Scaffold e Configurações Base
- [ ] Inicializar projeto NestJS em `backend/` (`npx nest new`).
- [ ] Configurar `.gitignore` local do backend.
- [ ] Configurar `tsconfig.json` com path aliases (`@domain/*`, `@application/*`, etc.).
- [ ] Configurar ESLint e Prettier seguindo os padrões do projeto.
- [ ] Configurar Husky e lint-staged para garantir qualidade nos commits.

## 2. Estrutura de Pastas (Hexagonal)
- [ ] Criar diretório `src/shared/` para lógica global.
- [ ] Criar diretório `src/modules/` para bounded contexts.
- [ ] Estruturar o submódulo `iam` conforme o `folder_structure.md`.

## 3. Infraestrutura e Persistência
- [ ] Configurar TypeORM com PostgreSQL 18.
- [ ] Implementar `BaseEntity` e `BaseRepository` no `shared/domain`.
- [ ] Configurar ambiente de variáveis (`.env` e `@nestjs/config`).
- [ ] Validar conexão com o banco via Docker Compose.

## 4. Cross-cutting Concerns (Shared)
- [ ] Implementar Filtro Global de Exceções.
- [ ] Implementar Interceptor de Resposta Padronizada.
- [ ] Configurar Swagger (OpenAPI) para documentação automática.
- [ ] Configurar `ValidationPipe` global para uso do `class-validator`.

## 5. Primeiro Caso de Uso (Referência)
- [ ] Implementar `RegisterUserUseCase` (Core).
- [ ] Implementar `UserMapper` e `UserPersistence` (Infra).
- [ ] Implementar `AuthController` e endpoint de registro (Presentation).
- [ ] Validar com primeiro teste de integração (BDD/Jest).

---
*Criado em: 05/03/2026* - **PENDENTE**
