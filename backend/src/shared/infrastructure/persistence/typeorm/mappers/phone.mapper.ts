import { Phone } from '@shared/domain/phone.entity';
import { PhoneOrmEntity } from '../entities/phone.orm-entity';

export class PhoneMapper {
  static toDomain(orm: PhoneOrmEntity): Phone {
    return new Phone({
      id: orm.id,
      countryCode: orm.countryCode,
      phoneNumber: orm.phoneNumber,
      isPrimary: orm.isPrimary,
      phoneableId: orm.phoneableId,
      phoneableType: orm.phoneableType,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toPersistence(domain: Phone): PhoneOrmEntity {
    const orm = new PhoneOrmEntity();
    if (domain.id) orm.id = domain.id;
    orm.countryCode = domain.countryCode;
    orm.phoneNumber = domain.phoneNumber;
    orm.isPrimary = domain.isPrimary;
    orm.phoneableId = domain.phoneableId;
    orm.phoneableType = domain.phoneableType;
    return orm;
  }
}
