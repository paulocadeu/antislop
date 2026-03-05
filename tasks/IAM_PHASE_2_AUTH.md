# Checklist: IAM - Fase 2 (Segurança e Auth)

Esta fase implementa o sistema de tokens (JWT), segurança de rotas e recuperação de senha.

## 1. Infraestrutura de Segurança (Infra & Presentation)
- [ ] **JWT & Token Service**
    - [ ] Configurar `@nestjs/jwt` no `AppModule`.
    - [ ] Criar `ITokenService` (Application Port).
    - [ ] Implementar `JwtTokenAdapter` (Infra) para geração e validação.
- [ ] **Guards & Decorators**
    - [ ] Criar `JwtAuthGuard` (Global ou por rota).
    - [ ] Criar decorator `@CurrentUser()` para extrair dados do token.
- [ ] **Estratégias (Passport)**
    - [ ] Implementar `JwtStrategy` e `LocalStrategy`.

## 2. Implementação de Casos de Uso
### 2.1 AuthenticateUserUseCase
- [ ] Criar `LoginDto`.
- [ ] Implementar Use Case: Validar usuário/senha -> Gerar Par de Tokens -> Persistir Refresh Token.
- [ ] Criar endpoint `POST /auth/login`.

### 2.2 RefreshAccessTokenUseCase
- [ ] Implementar Use Case: Validar Refresh Token -> Verificar expiração/rotação -> Emitir novos tokens.
- [ ] Criar endpoint `POST /auth/refresh`.

### 2.3 LogoutUserUseCase
- [ ] Implementar Use Case: Invalidar Refresh Token associado.
- [ ] Criar endpoint `POST /auth/logout`.

### 2.4 Fluxo de Senha (Password Lifecycle)
- [ ] **RequestPasswordResetUseCase**: Gerar token temporário -> Disparar e-mail.
- [ ] **ResetPasswordUseCase**: Validar token -> Atualizar senha (hash) -> Invalidar token.
- [ ] **ChangePasswordUseCase**: Validar senha antiga -> Atualizar para nova (hash).

## 3. Segurança Global (Cross-cutting)
- [ ] Implementar `ThrottlerModule` (Rate Limit) para rotas sensíveis de Auth.
- [ ] Configurar cabeçalhos de segurança (Helmet).

---
*Status: PENDENTE*
