# Checklist: Cenários BDD (IAM)

Este checklist mapeia o progresso da escrita dos cenários de comportamento (Gherkin) para o módulo IAM em `docs/backend/modules/01_IAM/bdd/`.

## 1. Subdomínio: Autenticação (Auth)
- [x] **AuthenticateUserUseCase**
- [x] **RefreshAccessTokenUseCase**
- [x] **LogoutUserUseCase**
- [x] **RequestPasswordResetUseCase**
- [x] **ResetPasswordUseCase**
- [x] **ChangePasswordUseCase**

## 2. Subdomínio: Identidade (User Identity)
- [x] **RegisterUserUseCase**
- [x] **VerifyUserEmailUseCase**
- [x] **UpdateUserProfileUseCase**
- [x] **UpdateUserPreferencesUseCase**
- [x] **ManageUserContactUseCase**

## 3. Subdomínio: Organizações (Multi-tenancy)
- [x] **CreateOrganizationUseCase**
- [x] **UpdateOrganizationUseCase**
- [x] **ManageOrganizationContactUseCase**
- [x] **SwitchOrganizationContextUseCase**

## 4. Subdomínio: Controle de Acesso (RBAC)
- [x] **InviteMemberToOrganizationUseCase**
- [x] **AcceptOrganizationInvitationUseCase**
- [x] **RemoveMemberFromOrganizationUseCase**
- [x] **CreateOrganizationRoleUseCase**
- [x] **AssignRoleToMemberUseCase**
- [x] **ListOrganizationMembersUseCase**

---
*Atualizado em: 05/03/2026* - **CONCLUÍDO (21/21)**
