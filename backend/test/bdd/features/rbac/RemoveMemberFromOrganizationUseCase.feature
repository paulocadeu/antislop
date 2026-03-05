# Feature: Remover Membro (RemoveMemberFromOrganizationUseCase)

  Como um administrador de organização
  Eu quero remover um membro do meu tenant
  Para que ele não tenha mais acesso aos dados da empresa

  Scenario: Remoção bem-sucedida de um membro
    Given que eu sou "Admin" da organização "Alpha Corp"
    And "Pedro" é um "Member" da "Alpha Corp"
    When eu remover o usuário "Pedro" da organização
    Then o registro de vínculo de "Pedro" com a "Alpha Corp" deve ser removido (ou inativado)
    And "Pedro" deve perder o acesso ao contexto da "Alpha Corp" imediatamente

  Scenario: Impedir remoção do último administrador (Owner)
    Given que eu sou o único administrador da "Alpha Corp"
    When eu tentar me remover da organização
    Then o sistema deve bloquear a ação informando que sou o último administrador
    And a organização não deve ficar órfã
