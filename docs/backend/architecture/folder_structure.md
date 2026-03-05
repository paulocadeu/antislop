# Organização de Pastas e Arquivos (Folder Structure)

Este documento define como a **Arquitetura Hexagonal** do projeto **ANTISLOP** é mapeada para o sistema de arquivos do backend NestJS.

## Estrutura Global (`/backend`)

O projeto segue uma abordagem modular por domínio de negócio. Cada módulo (ex: `iam`, `billing`) contém suas próprias camadas hexagonal isoladas.

```text
backend/
├── src/
│   ├── modules/                # Módulos de Negócio (Bounded Contexts)
│   │   └── [module-name]/      # Ex: iam, organizations, billing
│   │       ├── domain/         # Camada 1: Domínio (Regras Puras)
│   │       ├── application/    # Camada 2: Aplicação (Orquestração)
│   │       ├── infrastructure/ # Camada 3: Infraestrutura (Detalhes Técnicos)
│   │       └── presentation/   # Camada 4: Apresentação (Entrada de Dados)
│   ├── shared/                 # Código compartilhado entre módulos
│   │   ├── domain/             # BaseEntity, ValueObjects comuns
│   │   ├── application/        # Interfaces globais, Exceptions base
│   │   └── infrastructure/     # Filtros globais, Interceptors, Configs
│   ├── app.module.ts           # Módulo raiz que importa os sub-módulos
│   └── main.ts                 # Ponto de entrada (Bootstrap)
├── test/                       # Testes E2E (Integração de Borda)
├── package.json
└── tsconfig.json
```

---

## Detalhamento das Camadas por Módulo

### 1. Camada de Domínio (`/domain`)
*Nenhuma dependência de framework ou banco de dados.*

- `entities/`: Entidades de domínio puras (ex: `user.entity.ts`).
- `repositories/`: Interfaces (Ports) de persistência (ex: `iuser.repository.ts`).
- `services/`: Lógica de domínio complexa (ex: `password.service.ts`).
- `value-objects/`: Objetos de valor imutáveis (ex: `email.vo.ts`).
- `exceptions/`: Erros de negócio (ex: `invalid-credentials.exception.ts`).

### 2. Camada de Aplicação (`/application`)
*Depende apenas do Domínio.*

- `use-cases/`: Implementação dos fluxos de negócio (ex: `register-user.use-case.ts`).
- `dtos/`: Objetos de transferência de dados (ex: `register-user.dto.ts`).
- `mappers/`: Conversão entre DTOs e Entidades de Domínio.
- `ports/`: Interfaces para serviços externos que não são banco (ex: `imail.service.ts`).

### 3. Camada de Infraestrutura (`/infrastructure`)
*Implementação técnica e integração com NestJS.*

- `persistence/`:
    - `typeorm/`:
        - `entities/`: Entidades do banco de dados (ex: `user.orm-entity.ts`).
        - `repositories/`: Implementação real (ex: `typeorm-user.repository.ts`).
        - `mappers/`: Conversão entre ORM Entity e Domain Entity.
        - `migrations/`: Scripts de alteração de schema SQL.
- `security/`: Implementação de JWT, Hashing, Passport.
- `providers/`: Adaptadores de saída (ex: `nodemailer.service.ts`).
- `nest/`: Módulos NestJS (`iam.module.ts`) e configurações específicas do framework.

### 4. Camada de Apresentação (`/presentation`)
*Ponto de contato com o mundo externo.*

- `controllers/`: REST Controllers (ex: `auth.controller.ts`).
- `guards/`: Proteção de rotas (ex: `jwt-auth.guard.ts`).
- `interceptors/`: Transformação de resposta (ex: `logging.interceptor.ts`).
- `view-models/`: DTOs de resposta (Output) formatados para o cliente.

---

## Convenções de Nomenclatura

1.  **Arquivos:** `kebab-case.type.ts` (ex: `create-user.use-case.ts`).
2.  **Interfaces (Ports):** Prefixadas com `I` (ex: `IUserRepository`).
3.  **Implementações (Adapters):** Sufixadas com a tecnologia (ex: `TypeOrmUserRepository`).
4.  **Mappers:** Sufixadas com `Mapper` (ex: `UserMapper.toDomain()`, `UserMapper.toPersistence()`).

## Regras de Dependência (Linting)

Para garantir a integridade da arquitetura, utilizaremos ferramentas de linting (como `eslint-plugin-boundaries`) para impedir que:
- O **Domínio** importe algo da **Aplicação** ou **Infraestrutura**.
- A **Aplicação** importe algo da **Infraestrutura** ou **Apresentação**.
- A **Apresentação** tente acessar o Banco de Dados diretamente sem passar por um **Use Case**.
