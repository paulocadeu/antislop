import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UpdateUserProfileDto } from '../dtos/update-user-profile.dto';

export class UpdateUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, dto: UpdateUserProfileDto): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    if (dto.firstName !== undefined) {
      user.firstName = dto.firstName;
    }

    if (dto.lastName !== undefined) {
      user.lastName = dto.lastName;
    }

    if (dto.avatar !== undefined) {
      user.avatar = dto.avatar;
    }

    await this.userRepository.save(user);
  }
}
