# Checklist: Detalhamento dos Casos de Uso (IAM)

Este checklist mapeia o progresso do detalhamento técnico de cada Caso de Uso do módulo IAM em `docs/backend/modules/01_IAM/use-cases/`.

## 1. Subdomínio: Autenticação (Auth)
- [x] **AuthenticateUserUseCase**
- [x] **RefreshAccessTokenUseCase**
- [x] **LogoutUserUseCase**
- [ ] **RequestPasswordResetUseCase**
- [ ] **ResetPasswordUseCase**
- [ ] **ChangePasswordUseCase**

## 2. Subdomínio: Identidade (User Identity)
- [x] **RegisterUserUseCase**
- [ ] **VerifyUserEmailUseCase**
- [ ] **UpdateUserProfileUseCase**
- [ ] **UpdateUserPreferencesUseCase**
- [ ] **ManageUserContactUseCase**

## 3. Subdomínio: Organizações (Multi-tenancy)
- [ ] **CreateOrganizationUseCase**
- [ ] **UpdateOrganizationUseCase**
- [ ] **ManageOrganizationContactUseCase**
- [ ] **SwitchOrganizationContextUseCase**

## 4. Subdomínio: Controle de Acesso (RBAC)
- [ ] **InviteMemberToOrganizationUseCase**
- [ ] **AcceptOrganizationInvitationUseCase**
- [ ] **RemoveMemberFromOrganizationUseCase**
- [ ] **CreateOrganizationRoleUseCase**
- [ ] **AssignRoleToMemberUseCase**
- [ ] **ListOrganizationMembersUseCase**

---
*Atualizado em: 05/03/2026*
