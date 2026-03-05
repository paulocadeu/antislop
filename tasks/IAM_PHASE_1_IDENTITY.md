# Checklist: IAM - Fase 1 (Identidade e Perfil)

Esta fase foca no ciclo de vida inicial do usuário, suas preferências e dados de contato.

## 1. Infraestrutura Base (Shared & IAM)
- [x] **Polymorphic Contacts (Shared)**
    - [x] Criar `Phone` (Entity/Domain).
    - [x] Criar `Address` (Entity/Domain).
    - [x] Criar `PhoneOrmEntity` e `AddressOrmEntity` (TypeORM).
    - [x] Implementar lógica de vínculo genérico (`contactable_id`, `contactable_type`).
- [x] **User Preferences**
    - [x] Criar entidade de domínio `UserPreferences`.
    - [x] Criar `UserPreferencesOrmEntity` (Relacionamento 1:1 com User).
    - [x] Implementar `UserPreferencesMapper` e Repository.
- [x] **Notificações (Email)**
    - [x] Criar interface `IMailerService` no `Shared/Application`.
    - [x] Implementar `NodemailerAdapter` (Infra) conectado ao Maildev.

## 2. Implementação de Casos de Uso
### 2.1 RegisterUserUseCase (Refinamento)
- [x] Ajustar `User` para conter `UserPreferences`.
- [x] Atualizar Use Case para criar preferências padrão no ato do registro.
- [x] Disparar e-mail de "Boas-vindas/Verificação".

### 2.2 VerifyUserEmailUseCase
- [x] Criar `VerificationToken` (Value Object).
- [x] Implementar Use Case: Validar token -> Alterar status do usuário -> Persistir.
- [x] Criar endpoint `GET /auth/verify?token=...`.

### 2.3 UpdateUserProfileUseCase
- [x] Criar `UpdateUserProfileDto`.
- [x] Implementar Use Case: Validar permissão -> Atualizar campos (firstName, lastName, avatar).
- [x] Criar endpoint `PATCH /users/profile`.

### 2.4 UpdateUserPreferencesUseCase
- [x] Criar `UpdateUserPreferencesDto` (tema, idioma, etc).
- [x] Implementar Use Case e Repository.
- [x] Criar endpoint `PATCH /users/preferences`.

### 2.5 ManageUserContactUseCase
- [x] Criar DTOs para Adicionar/Remover Telefones e Endereços.
- [x] Implementar Use Case integrado aos repositórios polimórficos.
- [x] Criar endpoints `POST/DELETE /users/contacts/...`.

---
*Status: CONCLUÍDO*
