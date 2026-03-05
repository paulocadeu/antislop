# Feature: Criação de Organização (CreateOrganizationUseCase)

  Como um usuário ativo
  Eu quero criar uma nova organização
  Para que eu possa gerenciar meus próprios recursos e membros

  Background:
    Given que eu sou um usuário autenticado e ativo

  Scenario: Criação bem-sucedida de organização
    When eu solicitar a criação de uma organização com:
      | name   | Minha Empresa LTDA |
      | taxId  | 12.345.678/0001-90 |
      | email  | contato@minhaempresa.com |
    Then a organização deve ser criada no banco de dados
    And eu devo ser vinculado à organização como membro
    And meu papel (role) na organização deve ser "Admin" (Owner)
    And as roles padrão ("Admin", "Member", "Viewer") devem ser criadas para esta organização

  Scenario: Falha por CNPJ já cadastrado
    Given que já existe uma organização com o taxId "12.345.678/0001-90"
    When eu solicitar a criação de uma organização com o mesmo taxId
    Then o sistema deve retornar erro de "Organização já cadastrada" (409)
    And nenhuma nova organização deve ser criada
