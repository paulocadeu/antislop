# Feature: Atribuição de Papel a Membro (AssignRoleToMemberUseCase)

  Como um administrador de organização
  Eu quero alterar o papel de um colaborador
  Para que suas permissões reflitam suas novas responsabilidades

  Scenario: Promover membro a Administrador
    Given que eu sou "Admin" da "Alpha Corp"
    And "Maria" é atualmente uma "Viewer"
    When eu alterar o papel de "Maria" para "Admin"
    Then as permissões de "Maria" na "Alpha Corp" devem ser atualizadas imediatamente
    And o próximo token de contexto emitido para "Maria" deve conter o novo papel

  Scenario: Impedir atribuição de papel de outra organização
    Given que existe o papel "Manager" na "Beta Corp"
    When eu tentar atribuir este papel "Manager" da Beta a um membro da "Alpha Corp"
    Then o sistema deve retornar erro de integridade de tenant (403)
    And o papel do membro não deve ser alterado
