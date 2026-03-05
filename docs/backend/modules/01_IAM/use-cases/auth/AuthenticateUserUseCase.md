# Use Case: AuthenticateUserUseCase

## Descrição
Valida as credenciais do usuário (e-mail/senha) e emite um par de tokens JWT (Access e Refresh) para autenticação.

## Atores
- Usuário (ou Cliente da API)

## Pré-condições
- O usuário deve estar cadastrado no sistema.
- O status do usuário deve ser 'active'.

## Fluxo Principal
1. O sistema recebe as credenciais (e-mail e senha).
2. O sistema busca o usuário pelo e-mail fornecido.
3. O sistema compara o hash da senha fornecida com o `password_hash` armazenado.
4. O sistema gera um Access Token JWT com validade curta (ex: 15m).
5. O sistema gera um Refresh Token com validade longa (ex: 7d).
6. O sistema armazena o hash do Refresh Token no campo `hashed_refresh_token` do usuário.
7. O sistema retorna o par de tokens e os dados básicos do usuário.

## Fluxos Alternativos / Exceções
- **Usuário não encontrado:** Retorna erro de "Credenciais Inválidas" (401).
- **Senha incorreta:** Retorna erro de "Credenciais Inválidas" (401).
- **Usuário inativo/pendente:** Retorna erro de "Conta não ativa" (403).

## Pós-condições
- Um `last_login` atualizado na entidade `users`.
- Um par de tokens válido emitido para o cliente.

## Regras de Negócio
- **Segurança de Feedback:** Nunca informe se o erro foi no e-mail ou na senha especificamente.
- **Rotação:** Um novo `hashed_refresh_token` deve invalidar o anterior.

## Dependências (Ports)
- `IUsersRepository` (leitura e atualização)
- `IHashService` (comparação de senhas)
- `IAuthService` / `ITokenService` (geração de JWT)
