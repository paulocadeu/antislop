# Use Case: RegisterUserUseCase

## Descrição
Cria uma nova conta de usuário no sistema, gerencia preferências padrão e dispara o processo de verificação de e-mail.

## Atores
- Usuário (Visitante)

## Pré-condições
- O e-mail fornecido não deve estar em uso por outro usuário ativo.

## Fluxo Principal
1. O sistema recebe `firstName`, `lastName`, `email`, `password` e opcionalmente `taxId`.
2. O sistema verifica se o e-mail já existe na base.
3. O sistema gera um hash seguro da senha.
4. O sistema gera um `activation_token` e define uma data de expiração (`activation_token_expires_at`).
5. O sistema cria o registro em `users` com status 'pending_verification'.
6. O sistema cria as `user_preferences` padrão para o novo usuário.
7. O sistema dispara um e-mail de boas-vindas contendo o link de ativação.
8. O sistema retorna os dados básicos do usuário (sem tokens de acesso).

## Fluxos Alternativos / Exceções
- **E-mail já cadastrado:** Retorna erro de "E-mail já em uso" (409/Conflict).
- **Falha no envio de e-mail:** O registro é mantido, mas um log de erro é gerado para reprocessamento manual ou automático.

## Pós-condições
- Novo registro em `users`.
- Novo registro em `user_preferences`.
- E-mail de ativação enviado.

## Regras de Negócio
- **Senhas:** Devem seguir a política de complexidade (mínimo 8 caracteres, letras maiúsculas/minúsculas/números).
- **Ativação:** O token de ativação deve expirar em 24 horas por padrão.

## Dependências (Ports)
- `IUsersRepository`
- `IUserPreferencesRepository`
- `IHashService`
- `IMailService`
- `IUnitOfWork` (para garantir transação entre user e preferences)
