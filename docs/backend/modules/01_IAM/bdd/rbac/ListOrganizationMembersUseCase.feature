# Feature: Listagem de Membros (ListOrganizationMembersUseCase)

  Como um administrador de organização
  Eu quero ver a lista de todos os colaboradores
  Para que eu possa gerenciar a equipe

  Scenario: Listar membros com paginação
    Given que a "Alpha Corp" possui 50 membros cadastrados
    When eu solicitar a lista de membros com paginação (página 1, limite 10)
    Then o sistema deve retornar apenas os 10 primeiros membros
    And o total de 50 deve constar nos metadados da resposta
    And eu não devo ver membros de outras organizações (isolamento)

  Scenario: Filtrar membros por papel
    When eu filtrar a listagem pelo papel "Admin"
    Then o sistema deve retornar apenas os membros que possuem permissão de administrador
    And a contagem total deve refletir apenas os resultados filtrados
