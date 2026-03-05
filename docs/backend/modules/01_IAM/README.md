# Especificação do Módulo IAM

Este documento detalha os Casos de Uso do módulo de **Identity and Access Management (IAM)**, mapeados a partir do [ERD](./ERD_IAM.md) e seguindo o [Guia Arquitetural](../../architecture/architecture_blueprint.md).

Cada Use Case representa uma unidade de lógica de negócio na camada de **Aplicação**.

---

## 1. Subdomínio: Autenticação e Recuperação (Auth)
*Foco na segurança de acesso e gerenciamento de sessões.*

| Caso de Uso | Descrição | BDD | Entidades Relacionadas |
| :--- | :--- | :--- | :--- |
| [AuthenticateUserUseCase](./use-cases/auth/AuthenticateUserUseCase.md) | Valida e-mail/senha e emite par de tokens. | [Gherkin](./bdd/auth/AuthenticateUserUseCase.feature) | `users` |
| [RefreshAccessTokenUseCase](./use-cases/auth/RefreshAccessTokenUseCase.md) | Rotaciona o Access Token usando Refresh Token. | [Gherkin](./bdd/auth/RefreshAccessTokenUseCase.feature) | `users` |
| [LogoutUserUseCase](./use-cases/auth/LogoutUserUseCase.md) | Invalida a sessão/refresh token do usuário. | [Gherkin](./bdd/auth/LogoutUserUseCase.feature) | `users` |
| [RequestPasswordResetUseCase](./use-cases/auth/RequestPasswordResetUseCase.md) | Gera token de recuperação e dispara e-mail. | [Gherkin](./bdd/auth/RequestPasswordResetUseCase.feature) | `users` |
| [ResetPasswordUseCase](./use-cases/auth/ResetPasswordUseCase.md) | Altera a senha usando token de recuperação. | [Gherkin](./bdd/auth/ResetPasswordUseCase.feature) | `users` |
| [ChangePasswordUseCase](./use-cases/auth/ChangePasswordUseCase.md) | Altera a senha de um usuário logado. | [Gherkin](./bdd/auth/ChangePasswordUseCase.feature) | `users` |

## 2. Subdomínio: Identidade e Perfil (User Identity)
*Foco no ciclo de vida da conta do usuário.*

| Caso de Uso | Descrição | BDD | Entidades Relacionadas |
| :--- | :--- | :--- | :--- |
| [RegisterUserUseCase](./use-cases/identity/RegisterUserUseCase.md) | Cria novo usuário e preferências. | [Gherkin](./bdd/identity/RegisterUserUseCase.feature) | `users`, `user_preferences` |
| [VerifyUserEmailUseCase](./use-cases/identity/VerifyUserEmailUseCase.md) | Ativa a conta do usuário via token de e-mail. | [Gherkin](./bdd/identity/VerifyUserEmailUseCase.feature) | `users` |
| [UpdateUserProfileUseCase](./use-cases/identity/UpdateUserProfileUseCase.md) | Altera dados básicos (nome, avatar). | [Gherkin](./bdd/identity/UpdateUserProfileUseCase.feature) | `users` |
| [UpdateUserPreferencesUseCase](./use-cases/identity/UpdateUserPreferencesUseCase.md) | Altera tema, idioma e notificações. | [Gherkin](./bdd/identity/UpdateUserPreferencesUseCase.feature) | `user_preferences` |
| [ManageUserContactUseCase](./use-cases/identity/ManageUserContactUseCase.md) | Gerencia telefones e endereços do usuário. | [Gherkin](./bdd/identity/ManageUserContactUseCase.feature) | `phones`, `addresses` |

## 3. Subdomínio: Organizações (Multi-tenancy)
*Foco no isolamento e estrutura de tenants.*

| Caso de Uso | Descrição | BDD | Entidades Relacionadas |
| :--- | :--- | :--- | :--- |
| [CreateOrganizationUseCase](./use-cases/organizations/CreateOrganizationUseCase.md) | Cria organização e vincula o Owner. | [Gherkin](./bdd/organizations/CreateOrganizationUseCase.feature) | `organizations`, `organization_members` |
| [UpdateOrganizationUseCase](./use-cases/organizations/UpdateOrganizationUseCase.md) | Atualiza dados cadastrais da organização. | [Gherkin](./bdd/organizations/UpdateOrganizationUseCase.feature) | `organizations` |
| [ManageOrganizationContactUseCase](./use-cases/organizations/ManageOrganizationContactUseCase.md) | Gerencia contatos/endereços da organização. | [Gherkin](./bdd/organizations/ManageOrganizationContactUseCase.feature) | `phones`, `addresses` |
| [SwitchOrganizationContextUseCase](./use-cases/organizations/SwitchOrganizationContextUseCase.md) | Valida e emite token de contexto de tenant. | [Gherkin](./bdd/organizations/SwitchOrganizationContextUseCase.feature) | `organizations`, `organization_members` |

## 4. Subdomínio: Controle de Acesso e Membros (RBAC)
*Foco na governança interna de cada organização.*

| Caso de Uso | Descrição | BDD | Entidades Relacionadas |
| :--- | :--- | :--- | :--- |
| [InviteMemberToOrganizationUseCase](./use-cases/rbac/InviteMemberToOrganizationUseCase.md) | Dispara convite para novo membro. | [Gherkin](./bdd/rbac/InviteMemberToOrganizationUseCase.feature) | `organization_members` |
| [AcceptOrganizationInvitationUseCase](./use-cases/rbac/AcceptOrganizationInvitationUseCase.md) | Processa a entrada do membro na organização. | [Gherkin](./bdd/rbac/AcceptOrganizationInvitationUseCase.feature) | `organization_members` |
| [RemoveMemberFromOrganizationUseCase](./use-cases/rbac/RemoveMemberFromOrganizationUseCase.md) | Revoga o acesso de um membro à organização. | [Gherkin](./bdd/rbac/RemoveMemberFromOrganizationUseCase.feature) | `organization_members` |
| [CreateOrganizationRoleUseCase](./use-cases/rbac/CreateOrganizationRoleUseCase.md) | Define novos papéis com permissões JSONB. | [Gherkin](./bdd/rbac/CreateOrganizationRoleUseCase.feature) | `organization_roles` |
| [AssignRoleToMemberUseCase](./use-cases/rbac/AssignRoleToMemberUseCase.md) | Altera o papel de um membro existente. | [Gherkin](./bdd/rbac/AssignRoleToMemberUseCase.feature) | `organization_members`, `organization_roles` |
| [ListOrganizationMembersUseCase](./use-cases/rbac/ListOrganizationMembersUseCase.md) | Lista membros com paginação e filtros. | [Gherkin](./bdd/rbac/ListOrganizationMembersUseCase.feature) | `organization_members`, `users` |

---

## Notas de Implementação (Senior Review)

1.  **Isolamento:** Cada Use Case deve ser implementado como uma classe única para facilitar testes unitários e respeitar o SRP (Single Responsibility Principle).
2.  **Validação:** A validação de entrada (Input DTO) ocorre antes da execução do Use Case. A validação de regra de negócio ocorre dentro do Use Case ou na Entidade de Domínio.
3.  **Transações:** Use Cases que alteram múltiplas entidades (ex: `RegisterUserUseCase`) devem garantir atomicidade via transação no adaptador de persistência.
