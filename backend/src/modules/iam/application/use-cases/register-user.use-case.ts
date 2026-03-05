import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserPreferences } from '../../domain/entities/user-preferences.entity';
import type { IUserRepository } from '../../domain/repositories/iuser.repository';
import { RegisterUserDto } from '../dtos/register-user.dto';
import type { IHashService } from '../ports/ihash.service';
import type { IMailerService } from '@shared/application/ports/imailer.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IHashService')
    private readonly hashService: IHashService,
    @Inject('IMailerService')
    private readonly mailerService: IMailerService,
  ) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('User already exists with this email');
    }

    const passwordHash = await this.hashService.hash(dto.password);

    const user = new User({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      passwordHash,
      taxId: dto.taxId,
    });

    user.generateActivationToken();

    user.preferences = new UserPreferences({
      userId: user.id || '', // id is generated in persistence, but we can set up preferences
      theme: 'light',
      language: 'pt-BR',
    });

    const savedUser = await this.userRepository.save(user);

    // After saving, we have the ID (if we needed it for something else)
    // but the cascade save should handle preferences if configured correctly.

    await this.mailerService.sendEmail({
      to: savedUser.email,
      subject: 'Bem-vindo ao Antislop - Verifique seu e-mail',
      text: `Olá ${savedUser.firstName}, verifique seu e-mail usando o token: ${savedUser.activationToken}`,
    });

    return savedUser;
  }
}
