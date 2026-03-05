# Use Case: AcceptOrganizationInvitationUseCase

## Descrição
Processa o aceite de um convite por um usuário, ativando seu vínculo com a organização.

## Atores
- Usuário Convidado

## Pré-condições
- O usuário deve possuir um token de convite válido.
- O usuário deve estar autenticado (se já possuir conta) ou realizar o registro no mesmo fluxo.

## Fluxo Principal
1. O sistema recebe o `invitationToken`.
2. O sistema busca o registro pendente em `organization_members` vinculado ao token.
3. O sistema valida se o e-mail do usuário autenticado coincide com o e-mail do convite.
4. O sistema altera o status do membro de 'pending' para 'active'.
5. O sistema limpa o token de convite.
6. O sistema retorna os dados do novo vínculo.

## Fluxos Alternativos / Exceções
- **Token Inválido/Expirado:** Retorna erro 400.
- **Usuário não autenticado:** O sistema redireciona para o fluxo de `RegisterUserUseCase` ou `AuthenticateUserUseCase` antes de processar o aceite.

## Pós-condições
- Usuário agora possui acesso aos recursos da organização (via `SwitchOrganizationContext`).

## Regras de Negócio
- **Segurança:** O convite deve ser vinculado estritamente ao e-mail para o qual foi enviado.

## Dependências (Ports)
- `IOrganizationMembersRepository`
- `IUsersRepository`
