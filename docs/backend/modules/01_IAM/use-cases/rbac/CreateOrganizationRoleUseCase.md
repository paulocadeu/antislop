# Use Case: CreateOrganizationRoleUseCase

## Descrição
Cria um novo papel customizado dentro de uma organização, definindo um conjunto específico de permissões.

## Atores
- Administrador da Organização

## Pré-condições
- O administrador deve ter permissão de 'manage_roles'.

## Fluxo Principal
1. O sistema recebe `name`, `description` e o array de `permissions`.
2. O sistema valida se o array de permissões contém apenas strings válidas do sistema (ex: `user:read`, `org:update`).
3. O sistema cria o registro em `organization_roles` vinculado ao `organization_id`.
4. O sistema retorna o novo papel.

## Fluxos Alternativos / Exceções
- **Permissão Inválida:** Retorna erro 400 listando as permissões não reconhecidas.

## Pós-condições
- Novo papel disponível para atribuição a membros.

## Regras de Negócio
- **JSONB:** As permissões devem ser armazenadas como um array de strings no campo JSONB para flexibilidade futura.

## Dependências (Ports)
- `IOrganizationRolesRepository`
