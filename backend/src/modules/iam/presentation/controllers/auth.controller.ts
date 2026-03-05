import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { VerifyUserEmailUseCase } from '../../application/use-cases/verify-user-email.use-case';
import { RegisterUserDto } from '../../application/dtos/register-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InvalidActivationTokenException } from '../../domain/exceptions/invalid-activation-token.exception';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly verifyUserEmailUseCase: VerifyUserEmailUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 409, description: 'E-mail já em uso.' })
  async register(@Body() dto: RegisterUserDto) {
    await this.registerUserUseCase.execute(dto);
    return {
      message: 'User registered successfully. Please check your email to activate account.',
    };
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar e-mail do usuário' })
  @ApiQuery({ name: 'token', description: 'Token de ativação enviado por e-mail' })
  @ApiResponse({ status: 200, description: 'E-mail verificado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado.' })
  async verify(@Query('token') token: string) {
    try {
      await this.verifyUserEmailUseCase.execute(token);
      return { message: 'Email verified successfully.' };
    } catch (error) {
      if (error instanceof InvalidActivationTokenException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
