# Feature: Troca de Contexto de Organização (SwitchOrganizationContextUseCase)

  Como um usuário com acesso a múltiplas empresas
  Eu quero alternar entre os contextos de organização
  Para que minhas ações sejam isoladas no tenant selecionado

  Scenario: Troca de contexto bem-sucedida
    Given que eu sou um usuário autenticado
    And eu sou membro ativo da organização "Alpha Corp"
    When eu solicitar a troca para o contexto da "Alpha Corp"
    Then o sistema deve emitir um novo "Tenant Token"
    And o token deve conter o `org_id` da "Alpha Corp" no payload
    And o token deve conter minhas permissões específicas para aquela organização

  Scenario: Falha ao trocar para organização onde não sou membro
    Given que eu não possuo vínculo com a organização "Gamma Corp"
    When eu tentar trocar para o contexto da "Gamma Corp"
    Then o sistema deve retornar erro de "Acesso Negado" (403)
    And nenhum novo token deve ser emitido
