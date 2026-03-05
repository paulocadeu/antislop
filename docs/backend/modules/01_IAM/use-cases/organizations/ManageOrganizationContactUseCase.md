# Use Case: ManageOrganizationContactUseCase

## Descrição
Gerencia as informações de contato polimórficas (telefones e endereços) vinculadas a uma organização.

## Atores
- Administrador da Organização

## Pré-condições
- O usuário deve ter permissão de administrador na organização.

## Fluxo Principal
1. O sistema recebe a ação (adicionar, remover, atualizar) e os dados do contato.
2. O sistema valida se a organização alvo pertence ao escopo do administrador.
3. Em caso de **Adição**: Cria novo registro com `phoneable_type = 'organization'` ou `addressable_type = 'organization'`.
4. Em caso de **Atualização**: Modifica os dados e garante a regra de contato primário.
5. O sistema retorna a lista atualizada de contatos da organização.

## Fluxos Alternativos / Exceções
- **Organização Inexistente:** Retorna erro 404.

## Pós-condições
- Contatos da organização atualizados.

## Regras de Negócio
- **Polimorfismo:** `phoneable_id` e `addressable_id` devem apontar para o ID da organização.

## Dependências (Ports)
- `IPhonesRepository`
- `IAddressesRepository`
- `IOrganizationMembersRepository`
