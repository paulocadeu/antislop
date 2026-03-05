# Feature: Redefinição de Senha (ResetPasswordUseCase)

  Como um usuário com um token de recuperação
  Eu quero definir uma nova senha
  Para que eu possa voltar a acessar o sistema

  Scenario: Redefinição com token válido
    Given que eu possuo um token de reset válido para o usuário "joao@exemplo.com"
    When eu enviar a nova senha "NovaSenhaForte456" com o token
    Then a senha do usuário deve ser atualizada no banco (hash)
    And o token de reset deve ser invalidado
    And todas as sessões anteriores (refresh tokens) devem ser derrubadas

  Scenario: Falha com token expirado
    Given que eu possuo um token de reset que expirou há 10 minutos
    When eu tentar redefinir a senha
    Then o sistema deve retornar erro de "Token expirado" (400)
    And a senha antiga deve permanecer inalterada
