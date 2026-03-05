# Relatório de Fluxo de Trabalho TDD (Test-Driven Development)

Este documento formaliza a estratégia de testes adotada no projeto **ANTISLOP**, integrando **BDD (Behavior-Driven Development)** e **TDD** à **Arquitetura Hexagonal**.

## 1. Visão Estratégica: Outside-In TDD

Adotamos a abordagem **Outside-In** (de fora para dentro), onde o desenvolvimento de uma funcionalidade é guiado pelo seu comportamento externo esperado antes de mergulhar na implementação dos detalhes internos.

### O Mapeamento de Testes por Camada

| Camada Hexagonal | Tipo de Teste | Ferramenta | Objetivo |
| :--- | :--- | :--- | :--- |
| **Apresentação** | BDD / E2E | `jest-cucumber` / `supertest` | Validar contrato da API e fluxo completo do usuário. |
| **Aplicação** | Unitário (Use Case) | `jest` (Mocks) | Validar orquestração de negócio e isolamento de portas. |
| **Domínio** | Unitário (Entity) | `jest` | Garantir integridade das regras de negócio e invariantes. |
| **Infraestrutura** | Integração (Repo) | `jest` (Banco Real) | Validar persistência, Mappers e queries complexas. |

---

## 2. O Ciclo de Implementação de 5 Passos

Para cada novo Caso de Uso, seguimos este ciclo rigoroso para garantir cobertura de 100% da lógica de negócio:

### Passo 1: Definição de Comportamento (BDD - Red)
Começamos pela especificação Gherkin (`.feature`). Criamos um teste de aceitação que simula a requisição HTTP. O teste **deve falhar** (Red) pois o endpoint ou a lógica ainda não existem.

### Passo 2: Testes Unitários de Domínio (Red-Green-Refactor)
Descemos para o nível mais profundo. Se o Use Case exige novas regras na **Entidade de Domínio**, escrevemos testes unitários para a entidade. Implementamos apenas o necessário para o teste passar (Green).

### Passo 3: Testes Unitários de Aplicação (Isolation)
Criamos o teste para o **Use Case**. Nesta fase, utilizamos **Mocks** para todas as interfaces de saída (Ports). Testamos o caminho feliz e todos os cenários de erro conhecidos.

### Passo 4: Testes de Integração de Infraestrutura
Implementamos o adaptador de persistência (Repositório TypeORM). O teste é executado contra uma instância real do banco de dados (Docker), garantindo que o `Mapper` converte corretamente entre o domínio e o esquema SQL.

### Passo 5: Finalização e Validação E2E (Green)
Conectamos todas as peças no módulo NestJS. O teste de BDD criado no Passo 1 agora deve passar (Green), confirmando que a funcionalidade está pronta para entrega.

---

## 3. Infraestrutura de Apoio aos Testes

Para manter o fluxo ágil e confiável, utilizamos as seguintes ferramentas internas:

- **DatabaseCleaner:** Utilitário que executa `TRUNCATE` em todas as tabelas antes de cada teste de integração, garantindo isolamento total.
- **TestAppInstance:** Singleton que gerencia a instância do NestJS para testes E2E, configurando Pipes e Interceptors idênticos aos de produção.
- **Factories (Object Mother):** Padrão para criação de objetos de teste complexos (ex: `UserFactory`), evitando duplicação de código de setup nos specs.

---

## 4. Portões de Qualidade (Quality Gates)

1. **Pre-commit Hooks:** O Husky impede commits se os testes unitários afetados falharem ou se houver erros de linting.
2. **Cobertura de Código:** A meta estabelecida é de no mínimo **80% de cobertura global**, com foco em 100% de cobertura nos arquivos de `domain` e `application`.
3. **Imutabilidade de Testes:** Um teste nunca deve depender do estado deixado por outro. O uso de bancos de dados compartilhados sem limpeza é estritamente proibido.

---
*Documento criado em: 05/03/2026*
*Responsável: Gemini CLI / Senior Architect*
