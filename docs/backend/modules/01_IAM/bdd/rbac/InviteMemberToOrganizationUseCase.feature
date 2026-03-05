# Feature: Convite de Membro (InviteMemberToOrganizationUseCase)

  Como um administrador de organização
  Eu quero convidar novos membros
  Para que eles possam colaborar no meu tenant

  Background:
    Given que eu sou "Admin" da organização "Alpha Corp"
    And a organização "Alpha Corp" está ativa

  Scenario: Envio de convite bem-sucedido
    When eu convidar o e-mail "colaborador@gmail.com" com a role "Member"
    Then um registro pendente deve ser criado em "organization_members"
    And um e-mail contendo um link de aceite deve ser enviado para "colaborador@gmail.com"
    And o convite deve expirar em 7 dias

  Scenario: Impedir convite para quem já é membro
    Given que "colaborador@gmail.com" já é um membro ativo da "Alpha Corp"
    When eu tentar convidar o e-mail "colaborador@gmail.com"
    Then o sistema deve retornar erro de "Usuário já pertence à organização" (409)
    And nenhum e-mail deve ser enviado
