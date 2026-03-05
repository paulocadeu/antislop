# Use Case: ResetPasswordUseCase

## Descrição
Redefine a senha do usuário utilizando um token de recuperação válido.

## Atores
- Usuário (Visitante com link de reset)

## Pré-condições
- O usuário deve possuir um token de reset válido e não expirado.

## Fluxo Principal
1. O sistema recebe o `token` e a `newPassword`.
2. O sistema busca o usuário pelo `password_reset_token`.
3. O sistema verifica se o token expirou (`password_reset_expires_at`).
4. O sistema gera o hash da nova senha.
5. O sistema atualiza o `password_hash`.
6. O sistema limpa os campos `password_reset_token` e `password_reset_expires_at`.
7. O sistema invalida todos os Refresh Tokens existentes (`hashed_refresh_token = NULL`) por segurança.
8. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Token inválido ou não encontrado:** Retorna erro de "Token inválido" (400).
- **Token expirado:** Retorna erro de "Token expirado" (400).

## Pós-condições
- Senha do usuário alterada.
- Token invalidado.
- Sessões anteriores encerradas.

## Regras de Negócio
- **Segurança:** A troca de senha deve invalidar sessões ativas para garantir que um atacante que tenha roubado o token de refresh perca o acesso.

## Dependências (Ports)
- `IUsersRepository`
- `IHashService`
