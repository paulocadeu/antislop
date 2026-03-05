import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'João' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Silva' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'joao.silva@exemplo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SenhaSegura123', minLength: 8 })
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsOptional()
  taxId?: string;
}
