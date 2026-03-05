# Feature: Atualização de Organização (UpdateOrganizationUseCase)

  Como um administrador de organização
  Eu quero atualizar os dados cadastrais da minha empresa
  Para que as informações do tenant permaneçam precisas

  Scenario: Atualização bem-sucedida por administrador
    Given que eu sou "Admin" da organização "Alpha Corp"
    When eu atualizar o nome da organização para "Alpha Solutions LTDA"
    Then o sistema deve persistir o novo nome no banco
    And as informações atualizadas devem ser refletidas nos tokens de contexto subsequentes

  Scenario: Impedir atualização por usuário comum
    Given que eu sou apenas um "Member" da organização "Alpha Corp"
    When eu tentar atualizar o nome da organização para "Tentativa Hack"
    Then o sistema deve retornar erro de "Acesso Negado" (403)
    And o nome original da organização não deve ser alterado
