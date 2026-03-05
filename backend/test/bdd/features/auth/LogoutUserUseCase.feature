# Feature: Logout de Usuário (LogoutUserUseCase)

  Como um usuário logado
  Eu quero encerrar minha sessão
  Para que meus tokens não possam mais ser utilizados

  Scenario: Logout realizado com sucesso
    Given que eu sou um usuário autenticado
    When eu solicitar o logout
    Then o sistema deve remover o hash do "Refresh Token" do banco de dados
    And qualquer tentativa subsequente de usar o refresh token deve falhar

  Scenario: Logout silencioso para usuário inexistente
    When um logout for solicitado para um ID de usuário inválido
    Then o sistema deve responder com sucesso (200) para evitar vazamento de dados
