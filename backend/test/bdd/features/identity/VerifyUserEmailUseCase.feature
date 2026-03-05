# Feature: Verificação de E-mail (VerifyUserEmailUseCase)

  Como um novo usuário
  Eu quero confirmar meu e-mail através do link recebido
  Para que minha conta seja ativada

  Scenario: Verificação bem-sucedida
    Given que um usuário "joao@exemplo.com" possui o status "pending_verification"
    And o token de ativação "token-valido-123" existe e não expirou
    When eu acessar o endpoint de verificação com "token-valido-123"
    Then o status do usuário deve mudar para "active"
    And o token de ativação deve ser removido do banco
    And o sistema deve permitir que o usuário faça login

  Scenario: Falha por token expirado
    Given que o token de ativação expirou há mais de 24 horas
    When eu tentar realizar a verificação
    Then o sistema deve retornar erro de "Token expirado" (400)
    And o status do usuário deve permanecer "pending_verification"
    And o sistema deve oferecer a opção de reenviar o e-mail
