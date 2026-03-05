# Use Case: CreateOrganizationUseCase

## Descrição
Cria uma nova organização (tenant), define o usuário criador como "Owner" e estabelece a estrutura inicial de acesso.

## Atores
- Usuário Logado

## Pré-condições
- Usuário deve estar autenticado e com status 'active'.

## Fluxo Principal
1. O sistema recebe `name`, `taxId` (CNPJ/VAT), `email` e dados de endereço da organização.
2. O sistema verifica se o `taxId` já está em uso por outra organização.
3. O sistema cria o registro em `organizations`.
4. O sistema cria automaticamente as roles padrão (ex: 'Admin', 'Manager', 'Member') para esta organização em `organization_roles`.
5. O sistema vincula o usuário criador à organização em `organization_members` com a role de 'Admin'.
6. O sistema retorna os dados da nova organização e o vínculo do membro.

## Fluxos Alternativos / Exceções
- **Organização já existe (taxId):** Retorna erro de "Organização já cadastrada" (409).

## Pós-condições
- Novo Tenant isolado criado.
- Primeiro membro (Admin) vinculado.

## Regras de Negócio
- **Propriedade:** O criador é o primeiro administrador.
- **Isolamento:** A partir deste momento, o usuário pode realizar o `SwitchOrganizationContext`.

## Dependências (Ports)
- `IOrganizationsRepository`
- `IOrganizationMembersRepository`
- `IOrganizationRolesRepository`
- `IUnitOfWork` (Crítico: garante que organização, roles e membro sejam criados juntos)
