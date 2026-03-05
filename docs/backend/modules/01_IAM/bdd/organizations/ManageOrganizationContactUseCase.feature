# Feature: Gestão de Contatos da Organização (ManageOrganizationContactUseCase)

  Como um administrador de organização
  Eu quero gerenciar os dados de contato do meu tenant
  Para que as informações para faturamento e suporte sejam precisas

  Scenario: Atualizar endereço comercial primário
    Given que eu sou "Admin" da organização "Alpha Corp"
    When eu definir um novo endereço comercial como "is_primary"
    Then o novo endereço deve ser associado à organização (polimorfismo)
    And o endereço primário anterior deve ser desmarcado

  Scenario: Isolamento de dados entre organizações
    Given que eu sou "Admin" da organização "Alpha Corp"
    When eu tentar gerenciar contatos da organização "Beta Corp"
    Then o sistema deve me impedir de acessar (403/404)
    And os dados da "Beta Corp" não devem ser alterados
