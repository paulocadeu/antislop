# Checklist: Setup Inicial do Backend (NestJS)

Este checklist mapeia as tarefas necessárias para inicializar o projeto backend e configurar a base da Arquitetura Hexagonal.

## 1. Scaffold e Configurações Base
- [x] Inicializar projeto NestJS em `backend/` (`npx nest new`).
- [x] Configurar `.gitignore` local do backend.
- [x] Configurar `tsconfig.json` com path aliases (`@domain/*`, `@application/*`, etc.).
- [ ] Configurar ESLint e Prettier seguindo os padrões do projeto.
- [ ] Configurar Husky e lint-staged para garantir qualidade nos commits.

## 2. Estrutura de Pastas (Hexagonal)
- [x] Criar diretório `src/shared/` para lógica global.
- [x] Criar diretório `src/modules/` para bounded contexts.
- [x] Estruturar o submódulo `iam` conforme o `folder_structure.md`.

## 3. Infraestrutura e Persistência
- [x] Configurar TypeORM com PostgreSQL 18.
- [x] Implementar `BaseEntity` e `BaseRepository` no `shared/domain`.
- [x] Configurar ambiente de variáveis (`.env` e `@nestjs/config`).
- [x] Validar conexão com o banco via Docker Compose.

## 4. Cross-cutting Concerns (Shared)
- [x] Implementar Filtro Global de Exceções.
- [x] Implementar Interceptor de Resposta Padronizada.
- [x] Configurar Swagger (OpenAPI) para documentação automática.
- [x] Configurar `ValidationPipe` global para uso do `class-validator`.

## 5. Primeiro Caso de Uso (Referência)
- [x] Implementar `RegisterUserUseCase` (Core).
- [x] Implementar `UserMapper` e `UserPersistence` (Infra).
- [x] Implementar `AuthController` e endpoint de registro (Presentation).
- [ ] Validar com testes automatizados (Pendente para o próximo sprint).

---
*Atualizado em: 05/03/2026* - **CONCLUÍDO (Setup Base)**
