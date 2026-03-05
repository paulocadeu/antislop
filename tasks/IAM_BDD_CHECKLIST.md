# Checklist: Cenários BDD (IAM)

Este checklist mapeia o progresso da escrita dos cenários de comportamento (Gherkin) para o módulo IAM em `docs/backend/modules/01_IAM/bdd/`.

## 1. Subdomínio: Autenticação (Auth)
- [x] **AuthenticateUserUseCase**
- [ ] **RefreshAccessTokenUseCase**
- [ ] **LogoutUserUseCase**
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
- [x] **CreateOrganizationUseCase**
- [ ] **UpdateOrganizationUseCase**
- [ ] **ManageOrganizationContactUseCase**
- [ ] **SwitchOrganizationContextUseCase**

## 4. Subdomínio: Controle de Acesso (RBAC)
- [x] **InviteMemberToOrganizationUseCase**
- [ ] **AcceptOrganizationInvitationUseCase**
- [ ] **RemoveMemberFromOrganizationUseCase**
- [ ] **CreateOrganizationRoleUseCase**
- [ ] **AssignRoleToMemberUseCase**
- [ ] **ListOrganizationMembersUseCase**

---
*Criado em: 05/03/2026* - **EM PROGRESSO (4/21)**
