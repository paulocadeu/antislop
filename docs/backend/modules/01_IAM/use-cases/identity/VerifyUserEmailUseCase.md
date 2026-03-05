# Use Case: VerifyUserEmailUseCase

## Descrição
Valida o e-mail do usuário recém-cadastrado através do token enviado por e-mail, ativando sua conta.

## Atores
- Usuário (Recém-cadastrado)

## Pré-condições
- O usuário deve ter um registro com status 'pending_verification'.

## Fluxo Principal
1. O sistema recebe o `token` de ativação.
2. O sistema busca o usuário pelo `activation_token`.
3. O sistema verifica se o token expirou (`activation_token_expires_at`).
4. O sistema altera o status do usuário para 'active'.
5. O sistema limpa os campos `activation_token` e `activation_token_expires_at`.
6. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Token inválido:** Retorna erro de "Token de ativação inválido" (400).
- **Token expirado:** Retorna erro de "Token expirado" (400). Oferece opção de reenviar.

## Pós-condições
- Usuário habilitado para realizar login.

## Regras de Negócio
- **Ativação Única:** Uma conta já ativa não deve processar o token novamente.

## Dependências (Ports)
- `IUsersRepository`
