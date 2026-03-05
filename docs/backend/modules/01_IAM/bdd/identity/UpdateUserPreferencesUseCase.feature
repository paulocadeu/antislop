# Feature: Atualização de Preferências (UpdateUserPreferencesUseCase)

  Como um usuário logado
  Eu quero personalizar as configurações do sistema
  Para que o sistema se adapte ao meu uso

  Scenario: Alteração de idioma e tema
    Given que minhas preferências atuais são "pt-BR" e tema "light"
    When eu alterar o idioma para "en-US" e o tema para "dark"
    Then o sistema deve salvar as novas preferências
    And as próximas telas do sistema devem ser exibidas em "en-US" e "dark" mode

  Scenario: Validação de idioma suportado
    When eu tentar definir um idioma não suportado (ex: "fr-FR")
    Then o sistema deve retornar erro de validação (400)
    And as preferências originais não devem ser alteradas
