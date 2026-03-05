# Feature: Solicitação de Recuperação de Senha (RequestPasswordResetUseCase)

  Como um usuário que esqueceu a senha
  Eu quero receber um link de recuperação por e-mail
  Para que eu possa redefinir meu acesso

  Scenario: Solicitação para e-mail existente
    Given que o e-mail "cadastrado@exemplo.com" existe na base
    When eu solicitar a recuperação de senha para "cadastrado@exemplo.com"
    Then o sistema deve gerar um token único com expiração de 1 hora
    And um e-mail com o link de recuperação deve ser enviado
    And a resposta da API deve ser genérica (sucesso)

  Scenario: Proteção contra descoberta de e-mails (User Enumeration)
    When eu solicitar a recuperação para um e-mail "nao_existe@exemplo.com"
    Then o sistema deve responder com a mesma mensagem de sucesso do e-mail existente
    And nenhum e-mail deve ser enviado
    And nenhuma informação sobre a existência da conta deve ser vazada
