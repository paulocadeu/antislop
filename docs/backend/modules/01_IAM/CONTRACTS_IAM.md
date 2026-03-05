# Contratos de API (DTOs) - Exemplo: Registro de Usuário

Este documento exemplifica como os contratos (Data Transfer Objects) devem ser definidos na camada de **Apresentação** e **Aplicação**, utilizando as melhores práticas de validação e documentação.

## Caso de Uso: `RegisterUserUseCase`

### 1. Request DTO (Entrada)
Localização sugerida: `src/modules/iam/presentation/http/dto/register-user-request.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class RegisterUserRequestDto {
  @ApiProperty({ example: 'João', description: 'Primeiro nome do usuário' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Silva', description: 'Sobrenome do usuário' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'joao.silva@email.com', description: 'E-mail único para login' })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'Senha@123', 
    description: 'Senha forte (mínimo 8 caracteres, letras, números e símbolos)' 
  })
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha é muito fraca. Deve conter letras maiúsculas, minúsculas e símbolos.',
  })
  password: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  @IsString()
  taxId?: string; // CPF ou equivalente
}
```

### 2. Response DTO (Saída)
Localização sugerida: `src/modules/iam/application/dto/user-response.dto.ts`

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'João Silva' })
  fullName: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  email: string;

  @ApiProperty({ example: 'pending_verification', enum: ['active', 'inactive', 'pending_verification'] })
  status: string;

  @ApiProperty({ example: '2026-03-05T10:00:00Z' })
  createdAt: Date;
}
```

---

## Padrão de Respostas de Erro (Erro 400 - Bad Request)

Quando a validação falha, o sistema deve retornar um padrão consistente:

```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password is too short"
  ],
  "error": "Bad Request",
  "timestamp": "2026-03-05T14:30:00.000Z",
  "path": "/v1/auth/register"
}
```

## Diretrizes para Novos Contratos

1.  **Nomenclatura:**
    - Requisições: `[Action][Entity]RequestDto` (ex: `UpdateProfileRequestDto`).
    - Respostas: `[Entity]ResponseDto` (ex: `OrganizationResponseDto`).
2.  **Encapsulamento:** Nunca exponha campos internos do banco de dados (como `password_hash`) nos Response DTOs.
3.  **Mapeamento:** Use a classe `Mapper` na camada de Aplicação para converter a **Entidade de Domínio** no **Response DTO**.
4.  **Swagger:** Sempre utilize `@ApiProperty` para garantir que o `GET /docs` seja útil para o time de Frontend.
