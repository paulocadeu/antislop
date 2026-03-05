# Use Case: InviteMemberToOrganizationUseCase

## Descrição
Inicia o processo de inclusão de um novo membro em uma organização, disparando um convite por e-mail.

## Atores
- Administrador da Organização

## Pré-condições
- O administrador deve ter permissão de 'manage_members'.
- A organização deve estar ativa.

## Fluxo Principal
1. O sistema recebe o `email` do convidado e o `organization_role_id`.
2. O sistema verifica se o e-mail já é um membro ativo da organização.
3. O sistema cria um registro em `organization_members` com status 'pending' (vínculo temporário).
4. O sistema gera um token de convite único.
5. O sistema dispara um e-mail para o convidado com o link de aceite.
6. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Usuário já é membro:** Retorna erro "Usuário já pertence à organização" (409).
- **E-mail não cadastrado no sistema:** O fluxo permanece o mesmo (o convite forçará o registro do usuário ao aceitar).

## Pós-condições
- Registro pendente criado em `organization_members`.
- E-mail enviado.

## Regras de Negócio
- **Centralização:** Conforme a memória do projeto, este Use Case deve utilizar o serviço centralizado de convites no módulo Shared se disponível.

## Dependências (Ports)
- `IOrganizationMembersRepository`
- `IMailService`
- `IUsersRepository` (Para checar se o usuário já existe)
