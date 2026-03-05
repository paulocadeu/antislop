# Checklist: Plano de Testes Backend (IAM)

Este plano detalha as etapas para implementar a cobertura de testes no backend, garantindo que o diretório seja autossuficiente e siga a estratégia de Pirâmide de Testes.

## 1. Infraestrutura de Testes (Self-contained)
- [x] Configurar `backend/test/jest-e2e.json` com os mesmos path aliases do `package.json`.
- [x] Configurar suporte para execução de Gherkin (.feature) no Jest (ex: `jest-cucumber`).
- [x] Criar `DatabaseCleaner` em `backend/test/utils` para resetar o banco entre testes de integração.
- [x] Criar helper `TestAppInstance` para gerenciar o ciclo de vida do `TestingModule` do NestJS nos testes E2E.

## 2. Utilitários e Factories (backend/test/utils)
- [x] Implementar `UserFactory` para geração de entidades e DTOs de teste.
- [ ] Implementar `OrganizationFactory` e `RoleFactory`.
- [x] Definir constantes de teste (payloads padrão, tokens expirados, credenciais inválidas).

## 3. Testes Unitários (Core & Application)
- [ ] **Entidades de Domínio:**
    - [x] `User.entity.spec.ts`: Validar regras de criação e estado.
    - [ ] `Base.entity.spec.ts`: Validar lógica de auditoria.
- [ ] **Casos de Uso (Fase 1 - Identity):**
    - [x] `RegisterUserUseCase.spec.ts`: Sucesso, erro de e-mail duplicado, criação de preferências.
    - [ ] `VerifyUserEmailUseCase.spec.ts`: Token válido vs expirado.
    - [ ] `UpdateUserProfileUseCase.spec.ts`: Validação de campos e persistência.

## 4. Testes de Integração (Adapters & Infra)
- [ ] **Persistência:**
    - [ ] `TypeORMUserRepository.spec.ts`: Salvar/Buscar e validar o `UserMapper`.
    - [ ] `TypeORMAccountRepository.spec.ts`: (Se aplicável).
- [ ] **Serviços Externos:**
    - [ ] `BcryptHashService.spec.ts`: Verificar hash e comparação.
    - [ ] `JwtTokenAdapter.spec.ts`: Geração e decodificação de tokens.
    - [ ] `NodemailerAdapter.spec.ts`: Mocking do Maildev.

## 5. Testes E2E / BDD (Apresentação)
- [ ] Implementar Step Definitions para `RegisterUserUseCase.feature`.
- [ ] Implementar Step Definitions para `AuthenticateUserUseCase.feature`.
- [ ] Validar Isolamento de Tenant (Multi-tenancy) nos testes de Organização.
- [ ] Validar Interceptores e Filtros Globais (Responses padronizadas).

## 6. Qualidade e Automação
- [ ] Definir threshold de cobertura (Min 80%) no `jest` do `package.json`.
- [ ] Criar script `test:integration` para rodar apenas testes de infraestrutura.
- [ ] Garantir que `npm test` rode apenas unitários (rápido) e `npm run test:e2e` rode o fluxo completo.

---
*Criado em: 05/03/2026* - **STATUS: EM PLANEJAMENTO**
