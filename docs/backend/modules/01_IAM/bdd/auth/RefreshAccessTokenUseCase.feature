# Feature: Renovação de Token (RefreshAccessTokenUseCase)

  Como um cliente da API com um token expirado
  Eu quero renovar meu acesso usando um Refresh Token
  Para que eu permaneça logado sem reintroduzir minha senha

  Scenario: Renovação bem-sucedida (Rotation)
    Given que eu possuo um "Refresh Token" válido para o usuário "joao@exemplo.com"
    When eu solicitar a renovação do token
    Then o sistema deve invalidar o "Refresh Token" antigo
    And o sistema deve emitir um novo "Access Token"
    And o sistema deve emitir um novo "Refresh Token" (Rotation)
    And o novo hash do refresh token deve ser persistido no banco

  Scenario: Tentativa de reuso de Refresh Token (Detecção de Roubo)
    Given que um "Refresh Token" já foi utilizado e rotacionado
    When eu tentar usar o mesmo "Refresh Token" antigo novamente
    Then o sistema deve negar o acesso (401)
    And o sistema deve invalidar todos os tokens ativos do usuário por segurança
