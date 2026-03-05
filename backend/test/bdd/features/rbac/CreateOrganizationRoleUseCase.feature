# Feature: Gestão de Papéis Customizados (CreateOrganizationRoleUseCase)

  Como um administrador de organização
  Eu quero criar papéis com permissões granulares
  Para que eu possa seguir o princípio do menor privilégio

  Scenario: Criar papel de "Financeiro"
    Given que eu sou "Admin" da organização "Alpha Corp"
    When eu criar um novo papel chamado "Financeiro" com as permissões:
      | billing:read |
      | billing:write |
    Then o papel deve ser salvo no banco como um registro JSONB vinculado ao tenant
    And eu devo poder atribuir este papel a novos membros

  Scenario: Validar permissões válidas do sistema
    When eu tentar criar um papel com uma permissão inexistente (ex: "hack:database")
    Then o sistema deve retornar erro de validação de permissão
    And o papel não deve ser criado
