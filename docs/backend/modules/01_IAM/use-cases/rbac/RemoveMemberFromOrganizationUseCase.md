# Use Case: RemoveMemberFromOrganizationUseCase

## Descrição
Revoga o acesso de um membro a uma organização específica.

## Atores
- Administrador da Organização

## Pré-condições
- O administrador deve ter permissão de 'manage_members'.
- O membro a ser removido não pode ser o único Admin da organização.

## Fluxo Principal
1. O sistema recebe o `memberId` e o `organizationId`.
2. O sistema valida as permissões do administrador solicitante.
3. O sistema verifica se a remoção é permitida (ex: regra do último admin).
4. O sistema remove o registro de `organization_members` (ou altera status para 'inactive').
5. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Último Administrador:** Retorna erro impedindo a remoção para não deixar a organização órfã.

## Pós-condições
- O usuário perde acesso imediato ao contexto daquela organização.

## Regras de Negócio
- **Segurança:** Se o usuário estiver logado no contexto da organização removida, seu token de tenant deve ser invalidado (ou falhar na próxima validação de middleware).

## Dependências (Ports)
- `IOrganizationMembersRepository`
