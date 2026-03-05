# Use Case: AssignRoleToMemberUseCase

## Descrição
Altera o papel (e consequentemente as permissões) de um membro dentro da organização.

## Atores
- Administrador da Organização

## Pré-condições
- O administrador deve ter permissão de 'manage_members'.

## Fluxo Principal
1. O sistema recebe o `memberId` e o novo `organizationRoleId`.
2. O sistema valida se o novo papel pertence à mesma organização do membro.
3. O sistema atualiza o `organization_role_id` no registro do membro.
4. O sistema retorna o membro com os dados do novo papel.

## Fluxos Alternativos / Exceções
- **Papel não pertence à organização:** Retorna erro 400.

## Pós-condições
- O usuário terá suas permissões alteradas no próximo `SwitchOrganizationContext`.

## Regras de Negócio
- **Propagação:** Alterações de papel devem forçar a re-emissão de tokens de tenant para segurança.

## Dependências (Ports)
- `IOrganizationMembersRepository`
- `IOrganizationRolesRepository`
