import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UserStatus } from '../../domain/entities/user.entity';
import { InvalidActivationTokenException } from '../../domain/exceptions/invalid-activation-token.exception';

@Injectable()
export class VerifyUserEmailUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(token: string): Promise<void> {
    const user = await this.userRepository.findByActivationToken(token);

    if (!user || user.isTokenExpired()) {
      throw new InvalidActivationTokenException();
    }

    user.status = UserStatus.ACTIVE;
    user.activationToken = undefined;
    user.activationTokenExpiresAt = undefined;

    await this.userRepository.save(user);
  }
}
