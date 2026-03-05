# Use Case: UpdateUserProfileUseCase

## Descrição
Permite que o usuário atualize suas informações básicas de perfil, como nome e avatar.

## Atores
- Usuário Logado

## Pré-condições
- Usuário deve estar autenticado.

## Fluxo Principal
1. O sistema recebe `firstName`, `lastName` e opcionalmente `avatar` (URL).
2. O sistema recupera o usuário do contexto de autenticação.
3. O sistema valida os novos dados.
4. O sistema atualiza os campos na entidade `users`.
5. O sistema retorna os dados atualizados.

## Fluxos Alternativos / Exceções
- **Avatar inválido:** Se for fornecida uma URL malformada, retorna erro de validação (400).

## Pós-condições
- Perfil do usuário atualizado no banco de dados.

## Regras de Negócio
- **Auditoria:** O campo `updated_at` deve ser atualizado automaticamente.

## Dependências (Ports)
- `IUsersRepository`
