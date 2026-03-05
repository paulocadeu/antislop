# Feature: Registro de Novo Usuário (RegisterUserUseCase)

  Como um visitante do site
  Eu quero criar uma conta no sistema
  Para que eu possa utilizar os serviços do ANTISLOP

  Scenario: Registro bem-sucedido
    Given que não existe nenhum usuário cadastrado com o e-mail "novo@exemplo.com"
    When eu enviar os dados de registro:
      | firstName | João |
      | lastName  | Silva |
      | email     | novo@exemplo.com |
      | password  | SenhaForte123! |
    Then um novo usuário deve ser criado com status "pending_verification"
    And as preferências padrão de "tema" e "idioma" devem ser criadas
    And um e-mail de ativação deve ser enviado para "novo@exemplo.com"
    And a senha deve ser armazenada de forma segura (hash)

  Scenario: Falha no registro por e-mail duplicado
    Given que já existe um usuário ativo com o e-mail "existente@exemplo.com"
    When eu enviar os dados de registro com o e-mail "existente@exemplo.com"
    Then o sistema deve retornar um erro de "E-mail já em uso" (409)
    And nenhum e-mail de ativação deve ser disparado
