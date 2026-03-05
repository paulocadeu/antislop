# Use Case: RefreshAccessTokenUseCase

## Descrição
Renova o Access Token expirado utilizando um Refresh Token válido, garantindo que o usuário permaneça logado sem reintroduzir a senha.

## Atores
- Cliente da API (Frontend)

## Pré-condições
- O cliente deve possuir um Refresh Token válido.

## Fluxo Principal
1. O sistema recebe o `refresh_token`.
2. O sistema extrai o `user_id` do token.
3. O sistema busca o usuário e valida o `hashed_refresh_token` armazenado.
4. O sistema verifica se o token expirou.
5. O sistema gera um novo par de tokens (Access e novo Refresh Token).
6. O sistema atualiza o `hashed_refresh_token` do usuário com o hash do novo Refresh Token.
7. O sistema retorna o novo par de tokens.

## Fluxos Alternativos / Exceções
- **Token inválido/expirado:** Retorna erro de "Sessão expirada" (401).
- **Token não coincide com o hash:** Retorna erro de "Sessão inválida" (401) e limpa o `hashed_refresh_token` (indicação de possível roubo de token).

## Pós-condições
- Access Token renovado.
- Refresh Token rotacionado.

## Regras de Negócio
- **Refresh Token Rotation:** Sempre emita um novo Refresh Token ao renovar o acesso para invalidar o uso de tokens antigos roubados.

## Dependências (Ports)
- `IUsersRepository`
- `IAuthService` / `ITokenService`
- `IHashService`
