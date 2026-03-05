# Use Case: UpdateUserPreferencesUseCase

## Descrição
Permite ao usuário personalizar sua experiência no sistema, alterando idioma, tema e configurações de notificação.

## Atores
- Usuário Logado

## Pré-condições
- Usuário deve estar autenticado.

## Fluxo Principal
1. O sistema recebe as novas preferências (ex: `theme`, `locale`, `email_notifications`).
2. O sistema recupera as `user_preferences` vinculadas ao `user_id` autenticado.
3. O sistema valida os valores (ex: se o `locale` é suportado).
4. O sistema atualiza o registro em `user_preferences`.
5. O sistema retorna as preferências atualizadas.

## Fluxos Alternativos / Exceções
- **Preferências não encontradas:** Caso raro (deveria ser criado no registro), o sistema cria um novo registro de preferência.

## Pós-condições
- Preferências persistidas para futuras sessões.

## Regras de Negócio
- **Locales Suportados:** Atualmente limitado a `pt-BR` e `en-US`.

## Dependências (Ports)
- `IUserPreferencesRepository`
