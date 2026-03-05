# Feature: Alteração de Senha Logada (ChangePasswordUseCase)

  Como um usuário autenticado
  Eu quero alterar minha senha atual
  Para que eu mantenha minha conta segura

  Scenario: Alteração bem-sucedida
    Given que eu sou um usuário autenticado com a senha "SenhaAntiga123"
    When eu fornecer a senha atual "SenhaAntiga123" e a nova senha "NovaSenha789"
    Then a senha deve ser atualizada com sucesso
    And o sistema deve exigir que eu use a nova senha no próximo login

  Scenario: Falha por senha atual incorreta
    Given que eu sou um usuário autenticado
    When eu tentar alterar a senha fornecendo uma "senha atual" errada
    Then o sistema deve retornar erro de "Senha atual inválida" (400)
    And a senha não deve ser alterada
