# Checklist: IAM - Fase 1 (Identidade e Perfil)

Esta fase foca no ciclo de vida inicial do usuário, suas preferências e dados de contato.

## 1. Infraestrutura Base (Shared & IAM)
- [ ] **Polymorphic Contacts (Shared)**
    - [ ] Criar `Phone` (Entity/TypeORM).
    - [ ] Criar `Address` (Entity/TypeORM).
    - [ ] Implementar lógica de vínculo genérico (`contactable_id`, `contactable_type`).
- [ ] **User Preferences**
    - [ ] Criar entidade de domínio `UserPreferences`.
    - [ ] Criar `UserPreferencesOrmEntity` (Relacionamento 1:1 com User).
    - [ ] Implementar `UserPreferencesMapper` e Repository.
- [ ] **Notificações (Email)**
    - [ ] Criar interface `IMailerService` no `Shared/Application`.
    - [ ] Implementar `NodemailerAdapter` (Infra) conectado ao Maildev.

## 2. Implementação de Casos de Uso
### 2.1 RegisterUserUseCase (Refinamento)
- [ ] Ajustar `User` para conter `UserPreferences`.
- [ ] Atualizar Use Case para criar preferências padrão no ato do registro.
- [ ] Disparar e-mail de "Boas-vindas/Verificação".

### 2.2 VerifyUserEmailUseCase
- [ ] Criar `VerificationToken` (Value Object ou Entidade).
- [ ] Implementar Use Case: Validar token -> Alterar status do usuário -> Persistir.
- [ ] Criar endpoint `GET /auth/verify?token=...`.

### 2.3 UpdateUserProfileUseCase
- [ ] Criar `UpdateUserProfileDto`.
- [ ] Implementar Use Case: Validar permissão -> Atualizar campos (firstName, lastName, avatar).
- [ ] Criar endpoint `PATCH /users/profile`.

### 2.4 UpdateUserPreferencesUseCase
- [ ] Criar `UpdateUserPreferencesDto` (tema, idioma, etc).
- [ ] Implementar Use Case e Repository.
- [ ] Criar endpoint `PATCH /users/preferences`.

### 2.5 ManageUserContactUseCase
- [ ] Criar DTOs para Adicionar/Remover Telefones e Endereços.
- [ ] Implementar Use Case integrado aos repositórios polimórficos.
- [ ] Criar endpoints `POST/DELETE /users/contacts/...`.

---
*Status: PENDENTE*
