# Checklist: IAM - Fase 4 (RBAC & Membros)

Esta fase implementa a governança e gestão de permissões dentro de cada organização.

## 1. Infraestrutura de RBAC (Domain & Infra)
- [ ] **Organization Roles**
    - [ ] Criar entidade `OrganizationRole` com permissões em `JSONB`.
    - [ ] Criar `OrganizationRoleOrmEntity`.
    - [ ] Implementar `IRoleRepository`.
- [ ] **Invitations (Shared Component)**
    - [ ] Criar modulo `Invitations` no `Shared`.
    - [ ] Implementar `CreateInvitationUseCase` (agnóstico).
    - [ ] Definir `InvitationType` (MEMBER_INVITE).

## 2. Implementação de Casos de Uso
### 2.1 CreateOrganizationRoleUseCase
- [ ] Criar `CreateRoleDto` (com JSON de permissões).
- [ ] Implementar Use Case: Validar nome único na organização -> Persistir.
- [ ] Criar endpoint `POST /organizations/:orgId/roles`.

### 2.2 InviteMemberToOrganizationUseCase
- [ ] Criar `InviteMemberDto`.
- [ ] Implementar Use Case: Validar se já é membro -> Criar Convite -> Disparar e-mail com token.
- [ ] Criar endpoint `POST /organizations/:orgId/invites`.

### 2.3 AcceptOrganizationInvitationUseCase
- [ ] Implementar Use Case: Validar convite -> Ativar Usuário (se necessário) -> Criar `OrganizationMember` -> Invalidar convite.
- [ ] Criar endpoint `POST /v1/invitations/accept`.

### 2.4 AssignRoleToMemberUseCase
- [ ] Implementar Use Case: Validar papel existente -> Atualizar vínculo do membro.
- [ ] Criar endpoint `PATCH /organizations/:orgId/members/:memberId/role`.

### 2.5 ListOrganizationMembersUseCase
- [ ] Implementar Use Case: Listagem paginada com Join em `Users` e `Roles`.
- [ ] Criar endpoint `GET /organizations/:orgId/members`.

### 2.6 RemoveMemberFromOrganizationUseCase
- [ ] Implementar Use Case: Revogar acesso (Owner não pode se remover).
- [ ] Criar endpoint `DELETE /organizations/:orgId/members/:memberId`.

## 3. Autorização Granular (Cross-cutting)
- [ ] Criar `PermissionsGuard` para validar permissões JSONB decodificadas do JWT.
- [ ] Implementar decorator `@RequiredPermissions(...)`.

---
*Status: PENDENTE*
