import { UserPreferences } from '../../../../domain/entities/user-preferences.entity';
import { UserPreferencesOrmEntity } from '../entities/user-preferences.orm-entity';

export class UserPreferencesMapper {
  static toDomain(orm: UserPreferencesOrmEntity): UserPreferences {
    return new UserPreferences({
      id: orm.id,
      userId: orm.userId,
      theme: orm.theme,
      language: orm.language,
      emailNotifications: orm.emailNotifications,
      phoneNotifications: orm.phoneNotifications,
      acceptedTermsOfService: orm.acceptedTermsOfService,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toPersistence(domain: UserPreferences): UserPreferencesOrmEntity {
    const orm = new UserPreferencesOrmEntity();
    if (domain.id) orm.id = domain.id;
    orm.userId = domain.userId;
    orm.theme = domain.theme;
    orm.language = domain.language;
    orm.emailNotifications = domain.emailNotifications;
    orm.phoneNotifications = domain.phoneNotifications;
    orm.acceptedTermsOfService = domain.acceptedTermsOfService;
    return orm;
  }
}
