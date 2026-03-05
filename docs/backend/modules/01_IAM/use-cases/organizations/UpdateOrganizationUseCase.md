# Use Case: UpdateOrganizationUseCase

## Descrição
Permite que um administrador atualize os dados cadastrais da organização.

## Atores
- Administrador da Organização

## Pré-condições
- O usuário deve estar autenticado.
- O usuário deve ter permissão de administrador na organização (`organization_members.role`).

## Fluxo Principal
1. O sistema recebe os novos dados da organização (`name`, `email`, `avatar`, `status`).
2. O sistema valida se o usuário possui permissão de escrita para a organização alvo.
3. O sistema atualiza os campos correspondentes na entidade `organizations`.
4. O sistema retorna a organização atualizada.

## Fluxos Alternativos / Exceções
- **Sem permissão:** Retorna erro "Acesso Negado" (403) se o usuário não for Admin daquela organização específica.

## Pós-condições
- Dados da organização persistidos.

## Regras de Negócio
- **Status:** Apenas administradores do sistema (is_system_admin) podem alterar o status de 'active' para 'inactive' para evitar auto-bloqueio acidental ou fraude.

## Dependências (Ports)
- `IOrganizationsRepository`
- `IOrganizationMembersRepository` (Verificação de permissão)
