# Checklist: Fluxo TDD & BDD (IAM)

Este documento define o processo padrão para implementação de qualquer Caso de Uso no módulo IAM, garantindo qualidade via **Outside-In TDD**.

## 1. O Ciclo de Desenvolvimento (Passo-a-Passo)

Para cada Caso de Uso, siga rigorosamente esta ordem:

### Passo 1: Definição de Comportamento (BDD - Red)
- [ ] Identificar o arquivo `.feature` correspondente em `backend/test/bdd/features/`.
- [ ] Criar o arquivo de steps em `backend/test/bdd/steps/<modulo>/<use-case>.steps.ts`.
- [ ] Implementar os steps básicos (Given/When/Then) fazendo chamadas via `TestAppInstance` (Supertest).
- [ ] **Validar Falha:** Rodar `npm run test:e2e` e confirmar que o teste falha (geralmente 404 ou 500).

### Passo 2: Testes Unitários de Domínio (Unit - Red/Green)
- [ ] Se houver nova lógica na Entidade ou Value Object:
    - [ ] Criar/Atualizar `<entity>.spec.ts`.
    - [ ] Escrever o teste falhando.
    - [ ] Implementar a lógica na Entidade para o teste passar.
    - [ ] Refatorar se necessário.

### Passo 3: Testes Unitários de Aplicação (Unit - Red/Green)
- [ ] Criar `<use-case>.spec.ts` em `application/use-cases/`.
- [ ] Configurar Mocks para os Ports (Repositórios, Services).
- [ ] Escrever testes para:
    - [ ] Sucesso (Caminho feliz).
    - [ ] Falhas de validação de negócio (Ex: E-mail já existe).
    - [ ] Erros de dependências (Ex: Repositório fora do ar).
- [ ] **Validar Falha:** Confirmar que os testes falham.
- [ ] Implementar o Use Case até o verde.

### Passo 4: Testes de Integração (Integration - Red/Green)
- [ ] Criar `typeorm-<entity>.repository.spec.ts` em `infrastructure/persistence/typeorm/repositories/`.
- [ ] Implementar testes que toquem o banco de dados real (PostgreSQL).
- [ ] Garantir que o `DatabaseCleaner` limpe as tabelas antes de cada teste.
- [ ] Implementar o Repositório/Mapper até passar nos testes.

### Passo 5: Finalização BDD (E2E - Green)
- [ ] Criar/Atualizar o Controller e DTOs na camada de `Presentation`.
- [ ] Injetar as dependências no `IAMModule`.
- [ ] Rodar o BDD novamente.
- [ ] **Validar Sucesso:** O cenário deve ficar verde.

---

## 2. Status de Cobertura TDD (IAM)

Acompanhamento do progresso de implementação guiada por testes:

### Subdomínio: Identidade (Fase 1)
| Caso de Uso | Unit (Entity) | Unit (Use Case) | Integration | BDD (E2E) |
| :--- | :---: | :---: | :---: | :---: |
| RegisterUser | ✅ | ✅ | 🏗️ | 🏗️ |
| VerifyUserEmail | ⬜ | ⬜ | ⬜ | ⬜ |
| UpdateUserProfile | ⬜ | ⬜ | ⬜ | ⬜ |
| UpdateUserPreferences | ⬜ | ⬜ | ⬜ | ⬜ |
| ManageUserContact | ⬜ | ⬜ | ⬜ | ⬜ |

### Subdomínio: Autenticação (Fase 2)
| Caso de Uso | Unit (Entity) | Unit (Use Case) | Integration | BDD (E2E) |
| :--- | :---: | :---: | :---: | :---: |
| AuthenticateUser | ⬜ | ⬜ | ⬜ | ⬜ |
| RefreshAccessToken | ⬜ | ⬜ | ⬜ | ⬜ |
| LogoutUser | ⬜ | ⬜ | ⬜ | ⬜ |
| ResetPassword | ⬜ | ⬜ | ⬜ | ⬜ |

---

## 3. Regras de Ouro
1. **Nenhum código de produção sem teste:** Se você encontrar um bug, escreva um teste que o reproduza antes de corrigir.
2. **Mocks apenas para interfaces:** Nunca mocke classes concretas do Core; use os Ports.
3. **Isolamento Total:** Testes E2E/Integração não devem depender de dados criados por outros testes.
4. **Fast Feedback:** Mantenha os testes unitários rápidos. Se demorar mais de 10s para rodar o suite unitário, algo está errado.

---
*Legenda: ✅ Concluído | 🏗️ Em Progresso | ⬜ Pendente*
