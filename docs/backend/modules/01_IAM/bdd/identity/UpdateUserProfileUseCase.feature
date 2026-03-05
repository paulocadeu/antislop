# Feature: Atualização de Perfil (UpdateUserProfileUseCase)

  Como um usuário logado
  Eu quero atualizar meus dados básicos
  Para que meu perfil reflita minhas informações atuais

  Scenario: Atualização de nome e sobrenome
    Given que eu sou um usuário autenticado como "João Silva"
    When eu atualizar meu perfil para:
      | firstName | João Carlos |
      | lastName  | Silva Jr.   |
    Then o sistema deve persistir os novos nomes
    And o campo "updated_at" deve ser atualizado

  Scenario: Atualização de avatar
    Given que eu sou um usuário autenticado
    When eu fornecer uma URL válida para meu novo avatar
    Then o sistema deve salvar a URL do avatar no meu registro
    And o novo avatar deve ser retornado nas próximas consultas de perfil
