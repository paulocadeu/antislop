import { Controller, Post, Body, HttpCode, HttpStatus, ConflictException } from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { RegisterUserDto } from '../../application/dtos/register-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'E-mail já em uso.' })
  async register(@Body() dto: RegisterUserDto) {
    try {
      await this.registerUserUseCase.execute(dto);
      return { message: 'User registered successfully. Please check your email to activate account.' };
    } catch (error) {
      if (error.message === 'User already exists with this email') {
        throw new ConflictException('E-mail já em uso');
      }
      throw error;
    }
  }
}
