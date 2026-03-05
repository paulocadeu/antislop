# Feature: Gestão de Contatos do Usuário (ManageUserContactUseCase)

  Como um usuário logado
  Eu quero gerenciar meus telefones e endereços
  Para que eu mantenha meus dados de contato atualizados

  Scenario: Adicionar novo telefone primário
    Given que eu já possuo um telefone cadastrado
    When eu adicionar um novo telefone e marcá-lo como "is_primary"
    Then o novo telefone deve ser salvo com sucesso
    And o telefone antigo deve deixar de ser o "is_primary" automaticamente

  Scenario: Remover um endereço
    Given que eu possuo dois endereços cadastrados
    When eu solicitar a remoção de um dos endereços
    Then o endereço deve ser excluído da base de dados
    And o sistema deve garantir que eu não fique sem nenhum endereço primário se houver outros
