# Casos de Uso (Use Cases) - IAM

Este documento detalha os Casos de Uso do módulo de **Identity and Access Management (IAM)**, mapeados a partir do [ERD](./ERD_IAM.md) e seguindo o [Guia Arquitetural](../../architecture/architecture_blueprint.md).

Cada Use Case representa uma unidade de lógica de negócio na camada de **Aplicação**.

---

## 1. Subdomínio: Autenticação e Recuperação (Auth)
*Foco na segurança de acesso e gerenciamento de sessões.*

| Caso de Uso | Descrição | Entidades Relacionadas |
| :--- | :--- | :--- |
| [AuthenticateUserUseCase](./use-cases/auth/AuthenticateUserUseCase.md) | Valida e-mail/senha e emite par de tokens (Access/Refresh). | `users` |
| [RefreshAccessTokenUseCase](./use-cases/auth/RefreshAccessTokenUseCase.md) | Rotaciona o Access Token usando um Refresh Token válido. | `users` |
| [LogoutUserUseCase](./use-cases/auth/LogoutUserUseCase.md) | Invalida a sessão/refresh token do usuário. | `users` |
| [RequestPasswordResetUseCase](./use-cases/auth/RequestPasswordResetUseCase.md) | Gera token de recuperação e dispara e-mail. | `users` |
| [ResetPasswordUseCase](./use-cases/auth/ResetPasswordUseCase.md) | Altera a senha usando um token de recuperação válido. | `users` |
| [ChangePasswordUseCase](./use-cases/auth/ChangePasswordUseCase.md) | Altera a senha de um usuário logado (exige senha atual). | `users` |

## 2. Subdomínio: Identidade e Perfil (User Identity)
*Foco no ciclo de vida da conta do usuário.*

| Caso de Uso | Descrição | Entidades Relacionadas |
| :--- | :--- | :--- |
| [RegisterUserUseCase](./use-cases/identity/RegisterUserUseCase.md) | Cria novo usuário (pendente), preferências e envia ativação. | `users`, `user_preferences` |
| [VerifyUserEmailUseCase](./use-cases/identity/VerifyUserEmailUseCase.md) | Ativa a conta do usuário via token de e-mail. | `users` |
| [UpdateUserProfileUseCase](./use-cases/identity/UpdateUserProfileUseCase.md) | Altera dados básicos (nome, avatar). | `users` |
| [UpdateUserPreferencesUseCase](./use-cases/identity/UpdateUserPreferencesUseCase.md) | Altera tema, idioma e notificações. | `user_preferences` |
| [ManageUserContactUseCase](./use-cases/identity/ManageUserContactUseCase.md) | Gerencia telefones e endereços vinculados ao usuário. | `phones`, `addresses` |

## 3. Subdomínio: Organizações (Multi-tenancy)
*Foco no isolamento e estrutura de tenants.*

| Caso de Uso | Descrição | Entidades Relacionadas |
| :--- | :--- | :--- |
| [CreateOrganizationUseCase](./use-cases/organizations/CreateOrganizationUseCase.md) | Cria organização, vincula o Owner e define roles padrão. | `organizations`, `organization_members` |
| [UpdateOrganizationUseCase](./use-cases/organizations/UpdateOrganizationUseCase.md) | Atualiza dados cadastrais da organização. | `organizations` |
| [ManageOrganizationContactUseCase](./use-cases/organizations/ManageOrganizationContactUseCase.md) | Gerencia contatos/endereços da organização. | `phones`, `addresses` |
| [SwitchOrganizationContextUseCase](./use-cases/organizations/SwitchOrganizationContextUseCase.md) | Valida e emite token para um contexto de organização específico. | `organizations`, `organization_members` |

## 4. Subdomínio: Controle de Acesso e Membros (RBAC)
*Foco na governança interna de cada organização.*

| Caso de Uso | Descrição | Entidades Relacionadas |
| :--- | :--- | :--- |
| [InviteMemberToOrganizationUseCase](./use-cases/rbac/InviteMemberToOrganizationUseCase.md) | Dispara convite para novo membro. | `organization_members` |
| [AcceptOrganizationInvitationUseCase](./use-cases/rbac/AcceptOrganizationInvitationUseCase.md) | Processa a entrada do membro na organização. | `organization_members` |
| [RemoveMemberFromOrganizationUseCase](./use-cases/rbac/RemoveMemberFromOrganizationUseCase.md) | Revoga o acesso de um membro à organização. | `organization_members` |
| [CreateOrganizationRoleUseCase](./use-cases/rbac/CreateOrganizationRoleUseCase.md) | Define novos papéis com permissões JSONB customizadas. | `organization_roles` |
| [AssignRoleToMemberUseCase](./use-cases/rbac/AssignRoleToMemberUseCase.md) | Altera o papel de um membro existente. | `organization_members`, `organization_roles` |
| [ListOrganizationMembersUseCase](./use-cases/rbac/ListOrganizationMembersUseCase.md) | Lista membros com paginação e filtros de status/papel. | `organization_members`, `users` |

---

## Notas de Implementação (Senior Review)

1.  **Isolamento:** Cada Use Case deve ser implementado como uma classe única para facilitar testes unitários e respeitar o SRP (Single Responsibility Principle).
2.  **Validação:** A validação de entrada (Input DTO) ocorre antes da execução do Use Case. A validação de regra de negócio ocorre dentro do Use Case ou na Entidade de Domínio.
3.  **Transações:** Use Cases que alteram múltiplas entidades (ex: `RegisterUserUseCase`) devem garantir atomicidade via transação no adaptador de persistência.
