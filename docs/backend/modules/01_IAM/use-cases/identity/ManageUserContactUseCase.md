# Use Case: ManageUserContactUseCase

## Descrição
Gerencia as informações de contato polimórficas (telefones e endereços) vinculadas à conta do usuário.

## Atores
- Usuário Logado

## Pré-condições
- Usuário deve estar autenticado.

## Fluxo Principal
1. O sistema recebe uma ação (adicionar, remover ou atualizar) e os dados do contato (`phones` ou `addresses`).
2. O sistema valida se o contato pertence ao usuário (`phoneable_id` / `addressable_id`).
3. Em caso de **Adição**: Cria novo registro com `phoneable_type = 'user'`.
4. Em caso de **Atualização**: Modifica os campos e garante que apenas um seja `is_primary`.
5. Em caso de **Remoção**: Deleta o registro.
6. O sistema retorna a lista atualizada de contatos do tipo afetado.

## Fluxos Alternativos / Exceções
- **Contato não pertence ao usuário:** Retorna erro de "Não autorizado" (403).
- **Tentativa de remover o último contato primário:** Retorna erro exigindo que outro seja definido como primário primeiro.

## Pós-condições
- Estruturas polimórficas atualizadas.

## Regras de Negócio
- **Polimorfismo:** Deve garantir integridade manual já que FKs cruzadas não são nativas em relações polimórficas no Postgres.
- **Primário:** Apenas um telefone e um endereço podem ser `is_primary` por usuário.

## Dependências (Ports)
- `IPhonesRepository`
- `IAddressesRepository`
