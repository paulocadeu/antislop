import { User, UserStatus } from '../../../src/modules/iam/domain/entities/user.entity';
import { RegisterUserDto } from '../../../src/modules/iam/application/dtos/register-user.dto';

export class UserFactory {
  static createEntity(overrides: Partial<User> = {}): User {
    return new User({
      id: overrides.id || 'test-uuid',
      email: overrides.email || 'test@example.com',
      passwordHash: overrides.passwordHash || 'hashed-password',
      firstName: overrides.firstName || 'Test',
      lastName: overrides.lastName || 'User',
      status: overrides.status || UserStatus.PENDING_VERIFICATION,
      activationToken: overrides.activationToken || 'valid-token',
      activationTokenExpiresAt: overrides.activationTokenExpiresAt || new Date(Date.now() + 3600000), // 1 hour from now
      createdAt: overrides.createdAt || new Date(),
      updatedAt: overrides.updatedAt || new Date(),
    });
  }

  static createRegisterDto(overrides: Partial<RegisterUserDto> = {}): RegisterUserDto {
    return {
      email: overrides.email || 'newuser@example.com',
      password: overrides.password || 'Password123!',
      firstName: overrides.firstName || 'John',
      lastName: overrides.lastName || 'Doe',
    };
  }
}
