# Checklist: Testes Unitários - IAM Identity (Fase 1)

Este checklist foca no **Passo 3** do fluxo TDD: Implementação de testes unitários com mocks para a camada de aplicação.

## 1. Preparação de Mock Data & Utils
- [🏗️] Expandir `UserFactory` com campos de token (Identity base).
- [✅] Definir `VALID_VERIFICATION_TOKEN` em `TestConstants`.
- [ ] Criar tipos de Mock para Repositórios (usando `jest.Mocked<IUserRepository>`).

## 2. Implementação por Caso de Uso

### 2.1 VerifyUserEmailUseCase
- [✅] **Red:** Criar `verify-user-email.use-case.spec.ts` com falha inicial.
- [✅] **Mock Scenarios:**
    - [✅] Retorno de usuário pendente com token válido.
    - [✅] Retorno de usuário com token expirado (Erro).
    - [✅] Retorno nulo (Token inválido -> Erro).
- [✅] **Green:** Implementar lógica de ativação e persistência.

### 2.2 UpdateUserProfileUseCase
- [ ] **Red:** Criar `update-user-profile.use-case.spec.ts`.
- [ ] **Mock Scenarios:**
    - [ ] Usuário encontrado -> Validar atribuição de `firstName`, `lastName` e `avatar`.
    - [ ] Usuário não encontrado (404 Error).
- [ ] **Green:** Implementar Use Case.

### 2.3 UpdateUserPreferencesUseCase
- [ ] **Red:** Criar `update-user-preferences.use-case.spec.ts`.
- [ ] **Mock Scenarios:**
    - [ ] Preferências existentes -> Validar merge parcial de campos.
    - [ ] Criar preferências caso não existam (Upsert logic).
- [ ] **Green:** Implementar Use Case.

### 2.4 ManageUserContactUseCase
- [ ] **Red:** Criar `manage-user-contact.use-case.spec.ts`.
- [ ] **Mock Scenarios:**
    - [ ] Adicionar telefone válido.
    - [ ] Adicionar endereço com CEP/Formato válido.
    - [ ] Remover contato inexistente (Erro).
- [ ] **Green:** Implementar Use Case.

## 3. Consolidação de Cobertura
- [ ] Garantir que todos os specs rodam em menos de 1s (fast feedback).
- [ ] Verificar se nenhum teste unitário está tocando o banco de dados real.
- [ ] Atualizar o status global em `TDD_WORKFLOW_CHECKLIST.md`.

---
*Criado em: 05/03/2026* - **STATUS: PENDENTE**
