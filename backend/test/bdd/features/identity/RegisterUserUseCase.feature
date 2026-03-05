# language: pt
Funcionalidade: Registro de Novo Usuário (RegisterUserUseCase)

  Como um visitante do site
  Eu quero criar uma conta no sistema
  Para que eu possa utilizar os serviços do ANTISLOP

  Cenário: Registro bem-sucedido
    Dado que não existe nenhum usuário cadastrado com o e-mail "novo@exemplo.com"
    Quando eu enviar os dados de registro:
      | firstName | lastName | email            | password       |
      | João      | Silva    | novo@exemplo.com | SenhaForte123! |
    Então um novo usuário deve ser criado com status "pending_verification"
    E as preferências padrão de "tema" e "idioma" devem ser criadas
    E um e-mail de ativação deve ser enviado para "novo@exemplo.com"
    E a senha deve ser armazenada de forma segura (hash)

  Cenário: Falha no registro por e-mail duplicado
    Dado que já existe um usuário ativo com o e-mail "existente@exemplo.com"
    Quando eu enviar os dados de registro com o e-mail "existente@exemplo.com"
    Então o sistema deve retornar um erro de "E-mail já em uso" (409)
    E nenhum e-mail de ativação deve ser disparado
