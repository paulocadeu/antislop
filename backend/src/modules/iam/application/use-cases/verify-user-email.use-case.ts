import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UserStatus } from '../../domain/entities/user.entity';

export class VerifyUserEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(token: string): Promise<void> {
    const user = await this.userRepository.findByActivationToken(token);

    if (!user) {
      throw new Error('Invalid or expired activation token.');
    }

    if (user.activationTokenExpiresAt && user.activationTokenExpiresAt < new Date()) {
      throw new Error('Invalid or expired activation token.');
    }

    user.status = UserStatus.ACTIVE;
    user.activationToken = undefined;
    user.activationTokenExpiresAt = undefined;

    await this.userRepository.save(user);
  }
}
