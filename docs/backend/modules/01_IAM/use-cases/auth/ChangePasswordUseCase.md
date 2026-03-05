# Use Case: ChangePasswordUseCase

## Descrição
Permite que um usuário logado altere sua própria senha mediante confirmação da senha atual.

## Atores
- Usuário Logado

## Pré-condições
- O usuário deve estar autenticado.

## Fluxo Principal
1. O sistema recebe a `currentPassword` e a `newPassword`.
2. O sistema busca o usuário autenticado.
3. O sistema valida se a `currentPassword` coincide com o hash atual.
4. O sistema gera o hash da `newPassword`.
5. O sistema atualiza o `password_hash`.
6. O sistema retorna sucesso.

## Fluxos Alternativos / Exceções
- **Senha atual incorreta:** Retorna erro de "Senha atual inválida" (400).

## Pós-condições
- Senha alterada com sucesso.

## Regras de Negócio
- **Validação:** A nova senha deve ser diferente da atual (recomendado).

## Dependências (Ports)
- `IUsersRepository`
- `IHashService`
