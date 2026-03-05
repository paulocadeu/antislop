# Documento de Especificações Técnicas (DET)

## Nome do projeto
ANTISLOP

## Aplicação backend

- **Linguagem:** Typescript
- **Framework:** nestjs
- **Banco de dados:** Postgres
- **ORM:** typeORM
- **Runtime:** Node.js (Primário), com Bun e Deno como alternativas para avaliação futura.
- **Nota sobre Execução de TypeScript:** Embora versões recentes do Node.js incluam suporte experimental para executar TypeScript nativamente (via "strip types"), nosso projeto continuará usando o processo de compilação padrão do NestJS via `tsc`. A razão é que o sistema de Injeção de Dependência do NestJS depende crucialmente dos metadados de tipos gerados pelos decoradores (`@Injectable`, etc.), algo que a abordagem nativa do Node.js não suporta.

## Arquitetura
- Arquitetura Hexagonal (Portas e Adaptadores)

## Stack Técnica e Ferramentas

- **Documentação da API:** Swagger (`@nestjs/swagger`)
- **Autenticação:** Passport.js (`@nestjs/passport`)
- **Configuração:** NestJS Config (`@nestjs/config`) para gerenciamento de variáveis de ambiente.
- **Validação:** `class-validator` e `class-transformer` para validação e transformação de DTOs.
- **Testes:** Jest para testes unitários e de integração.
- **Qualidade de Código:** ESLint para análise estática e Prettier para formatação de código.
- **Comunicação por E-mail:** Nodemailer para envio de e-mails transacionais.

## Módulos

### Identity and Access Management (IAM)
- **Responsabilidades:** Gerenciamento de ciclo de vida de usuários (cadastro, atualização, exclusão), autenticação (login/logout), controle de acesso baseado em papéis (RBAC) e gerenciamento de perfis.

## CI/CD (Continuous Integration/Deployment) e Ambientes

- **Containerização:** A aplicação será containerizada usando **Docker** para garantir a portabilidade entre ambientes.
- **CI/CD:** A ferramenta para automação de build, teste e deploy será definida posteriormente (ex: GitHub Actions, Jenkins, CircleCI).
- **Ambientes:** O projeto contará com os seguintes ambientes:
- **Desenvolvimento:** Ambiente local de cada desenvolvedor.
- **Homologação (Staging):** Ambiente similar à produção para testes de integração e validação.
- **Produção:** Ambiente final acessado pelos usuários.

## Infraestrutura como Código (IaC)

- **Diretório:** O diretório `/infra` na raiz do projeto é o local central para todos os artefatos de infraestrutura.
- **Conteúdo:** Ele abriga as configurações para o ambiente de desenvolvimento local (`docker-compose.yml`) e, futuramente, o código de Infraestrutura como Código (utilizando **Terraform** ou **OpenTofu**) para provisionar e gerenciar a infraestrutura na nuvem (AWS).
