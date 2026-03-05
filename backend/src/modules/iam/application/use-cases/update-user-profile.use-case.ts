import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UpdateUserProfileDto } from '../dtos/update-user-profile.dto';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, dto: UpdateUserProfileDto): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
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
