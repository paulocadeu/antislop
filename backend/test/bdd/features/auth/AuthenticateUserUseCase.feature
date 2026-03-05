# Feature: Autenticação de Usuário (AuthenticateUserUseCase)

  Como um usuário cadastrado
  Eu quero me autenticar no sistema
  Para que eu possa acessar recursos protegidos

  Background:
    Given que um usuário com e-mail "joao@exemplo.com" e senha "SenhaSegura123" existe na base
    And o status do usuário é "active"

  Scenario: Autenticação bem-sucedida
    When eu tentar me autenticar com e-mail "joao@exemplo.com" e senha "SenhaSegura123"
    Then o sistema deve retornar um "Access Token" válido
    And o sistema deve retornar um "Refresh Token" válido
    And a data de "último login" do usuário deve ser atualizada

  Scenario: Falha na autenticação por senha incorreta
    When eu tentar me autenticar com e-mail "joao@exemplo.com" e senha "SenhaErrada"
    Then o sistema deve retornar um erro de "Credenciais Inválidas" (401)
    And nenhum token deve ser emitido

  Scenario: Falha na autenticação por conta inativa
    Given o status do usuário "joao@exemplo.com" é "pending_verification"
    When eu tentar me autenticar com e-mail "joao@exemplo.com" e senha "SenhaSegura123"
    Then o sistema deve retornar um erro de "Conta não ativa" (403)
    And o sistema deve sugerir a verificação do e-mail

  Scenario: Prevenção de enumeração de usuário
    When eu tentar me autenticar com e-mail "nao_existente@exemplo.com" e senha "QualquerSenha"
    Then o sistema deve retornar o mesmo erro de "Credenciais Inválidas" (401)
    And o tempo de resposta deve ser similar ao de um usuário existente (proteção contra timing attack)
