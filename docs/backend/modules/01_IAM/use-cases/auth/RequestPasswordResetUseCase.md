# Use Case: RequestPasswordResetUseCase

## Descrição
Inicia o processo de recuperação de senha gerando um token seguro e disparando um e-mail para o usuário.

## Atores
- Usuário (Visitante/Esqueci minha senha)

## Pré-condições
- O e-mail deve existir na base de dados.
- O usuário deve estar com status 'active'.

## Fluxo Principal
1. O sistema recebe o `email`.
2. O sistema busca o usuário pelo e-mail.
3. O sistema gera um `password_reset_token` aleatório e seguro.
4. O sistema define a expiração em `password_reset_expires_at` (ex: 1 hora).
5. O sistema salva o token e a expiração no registro do usuário.
6. O sistema dispara um e-mail contendo o link com o token para redefinição.
7. O sistema retorna uma mensagem genérica de sucesso.

## Fluxos Alternativos / Exceções
- **Usuário não encontrado:** O sistema retorna sucesso (mesma mensagem) para evitar "User Enumeration" (descoberta de e-mails válidos).
- **Usuário inativo:** O sistema não envia o e-mail e retorna sucesso (mesma mensagem).

## Pós-condições
- Registro do usuário atualizado com token de reset.
- E-mail enviado.

## Regras de Negócio
- **Segurança (Enumeration):** Sempre retorne a mesma resposta, independente do e-mail existir ou não.
- **Expiração:** O token deve ser de uso único e expirar em curto prazo.

## Dependências (Ports)
- `IUsersRepository`
- `IMailService`
- `ITokenService`
