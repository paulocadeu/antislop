# Use Case: SwitchOrganizationContextUseCase

## Descrição
Permite que um usuário com acesso a múltiplas organizações alterne o contexto de acesso, recebendo um novo token JWT contendo o ID da organização e suas permissões específicas.

## Atores
- Usuário Logado

## Pré-condições
- O usuário deve estar autenticado globalmente.
- O usuário deve ser um membro ativo da organização alvo.

## Fluxo Principal
1. O sistema recebe o `organization_id`.
2. O sistema verifica se o usuário possui um registro em `organization_members` para este ID com status 'active'.
3. O sistema busca as permissões (JSONB) associadas ao `organization_role_id` do membro.
4. O sistema gera um novo Access Token (Tenant Token) incluindo o `org_id` e a lista de `permissions` no payload.
5. O sistema retorna o novo token.

## Fluxos Alternativos / Exceções
- **Usuário não é membro:** Retorna erro de "Acesso Negado" (403).
- **Membro inativo:** Retorna erro de "Vínculo desativado" (403).

## Pós-condições
- O cliente (Frontend) passa a usar o novo token para requisições subsequentes que exigem contexto de tenant.

## Regras de Negócio
- **Segurança:** O token de tenant deve ter uma expiração curta, similar ao Access Token global.
- **RBAC:** As permissões no token devem refletir exatamente o que está definido no `organization_roles`.

## Dependências (Ports)
- `IOrganizationMembersRepository`
- `IOrganizationRolesRepository`
- `IAuthService` / `ITokenService`
