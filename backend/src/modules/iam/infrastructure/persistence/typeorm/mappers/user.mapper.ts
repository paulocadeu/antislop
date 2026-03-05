import { User } from '../../../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class UserMapper {
  static toDomain(orm: UserOrmEntity): User {
    return new User({
      id: orm.id,
      firstName: orm.firstName,
      lastName: orm.lastName,
      email: orm.email,
      passwordHash: orm.passwordHash,
      taxId: orm.taxId,
      status: orm.status,
      avatar: orm.avatar,
      activationToken: orm.activationToken,
      activationTokenExpiresAt: orm.activationTokenExpiresAt,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toPersistence(domain: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    if (domain.id) orm.id = domain.id;
    orm.firstName = domain.firstName;
    orm.lastName = domain.lastName;
    orm.email = domain.email;
    orm.passwordHash = domain.passwordHash;
    if (domain.taxId) orm.taxId = domain.taxId;
    orm.status = domain.status;
    if (domain.avatar) orm.avatar = domain.avatar;
    if (domain.activationToken) orm.activationToken = domain.activationToken;
    if (domain.activationTokenExpiresAt)
      orm.activationTokenExpiresAt = domain.activationTokenExpiresAt;
    return orm;
  }
}
