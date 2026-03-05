# Feature: Aceite de Convite de Organização (AcceptOrganizationInvitationUseCase)

  Como um convidado
  Eu quero aceitar o convite para entrar em uma empresa
  Para que eu possa começar a colaborar

  Scenario: Aceite bem-sucedido
    Given que eu recebi um convite com o token "convite-xyz-456" para a "Alpha Corp"
    And eu estou autenticado com o e-mail correspondente ao convite
    When eu realizar o aceite usando o token "convite-xyz-456"
    Then meu status de membro na "Alpha Corp" deve mudar para "active"
    And o token de convite deve ser invalidado
    And eu devo ganhar acesso aos recursos da organização

  Scenario: Tentar aceitar com token expirado
    Given que o convite foi enviado há mais de 7 dias
    When eu tentar aceitar o convite
    Then o sistema deve retornar erro de "Convite expirado" (400)
    And meu status deve permanecer pendente ou o convite ser removido
