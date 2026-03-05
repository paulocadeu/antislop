# Checklist: IAM - Fase 3 (Organizações & Multi-tenancy)

Esta fase implementa o isolamento de tenants (Organizações) e a gestão administrativa da conta corporativa.

## 1. Infraestrutura Multi-tenant (Domain & Infra)
- [ ] **Organization Core**
    - [ ] Criar entidade de domínio `Organization`.
    - [ ] Criar `OrganizationOrmEntity`.
    - [ ] Criar `IOrganizationRepository` e implementação TypeORM.
- [ ] **Organization Member (Tenancy Link)**
    - [ ] Criar entidade `OrganizationMember` (Vínculo User-Org).
    - [ ] Definir Enums de Status de Membro (Active, Pending, Suspended).
    - [ ] Implementar Repository para gestão de membros.

## 2. Implementação de Casos de Uso
### 2.1 CreateOrganizationUseCase
- [ ] Criar `CreateOrganizationDto`.
- [ ] Implementar Use Case: Validar limite (opcional) -> Criar Org -> Vincular User como `Owner` -> Transação.
- [ ] Criar endpoint `POST /organizations`.

### 2.2 SwitchOrganizationContextUseCase (CRÍTICO)
- [ ] Implementar Use Case: Validar se user é membro ativo -> Invalidar token atual -> Emitir Novo Token com `org_id` no payload.
- [ ] Criar endpoint `POST /organizations/:id/switch`.

### 2.3 UpdateOrganizationUseCase
- [ ] Criar `UpdateOrganizationDto`.
- [ ] Implementar Use Case (Apenas Owners/Admins).
- [ ] Criar endpoint `PATCH /organizations/:id`.

### 2.4 ManageOrganizationContactUseCase
- [ ] Reutilizar a estrutura polimórfica de `Phone` e `Address` criada na Fase 1.
- [ ] Implementar Use Case: Gerenciar contatos da organização.
- [ ] Criar endpoints `POST/DELETE /organizations/:id/contacts/...`.

## 3. Isolamento e Filtros (Cross-cutting)
- [ ] Implementar `TenantInterceptor` para injetar o `org_id` no request se presente no JWT.
- [ ] Configurar o TypeORM para suportar filtros automáticos por `org_id` (se aplicável à estratégia escolhida).

---
*Status: PENDENTE*
