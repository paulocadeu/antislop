import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/iuser.repository';
import { RegisterUserDto } from '../dtos/register-user.dto';
import type { IHashService } from '../ports/ihash.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IHashService')
    private readonly hashService: IHashService,
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

    return this.userRepository.save(user);
  }
}
