# Use Case: LogoutUserUseCase

## Descrição
Invalida a sessão atual do usuário, removendo o Refresh Token armazenado e garantindo que ele não possa mais renovar o acesso.

## Atores
- Usuário Logado

## Pré-condições
- O usuário deve estar autenticado.

## Fluxo Principal
1. O sistema recebe o `user_id` do contexto de autenticação.
2. O sistema busca o usuário no banco de dados.
3. O sistema define o campo `hashed_refresh_token` como `NULL`.
4. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Usuário não encontrado:** Retorna erro silencioso de sucesso para evitar vazamento de informações.

## Pós-condições
- O usuário não conseguirá mais realizar o refresh do token.

## Regras de Negócio
- **Segurança:** O logout deve limpar o token local no cliente (Frontend) e o hash no servidor simultaneamente.

## Dependências (Ports)
- `IUsersRepository` (atualização)
