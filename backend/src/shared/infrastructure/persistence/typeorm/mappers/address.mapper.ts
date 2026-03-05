import { Address } from '@shared/domain/address.entity';
import { AddressOrmEntity } from '../entities/address.orm-entity';

export class AddressMapper {
  static toDomain(orm: AddressOrmEntity): Address {
    return new Address({
      id: orm.id,
      street: orm.street,
      number: orm.number,
      complement: orm.complement,
      neighborhood: orm.neighborhood,
      city: orm.city,
      stateProvinceRegion: orm.stateProvinceRegion,
      postalCode: orm.postalCode,
      country: orm.country,
      countryCode: orm.countryCode,
      isPrimary: orm.isPrimary,
      addressableId: orm.addressableId,
      addressableType: orm.addressableType,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  static toPersistence(domain: Address): AddressOrmEntity {
    const orm = new AddressOrmEntity();
    if (domain.id) orm.id = domain.id;
    orm.street = domain.street;
    orm.number = domain.number;
    orm.complement = domain.complement;
    orm.neighborhood = domain.neighborhood;
    orm.city = domain.city;
    orm.stateProvinceRegion = domain.stateProvinceRegion;
    orm.postalCode = domain.postalCode;
    orm.country = domain.country;
    orm.countryCode = domain.countryCode;
    orm.isPrimary = domain.isPrimary;
    orm.addressableId = domain.addressableId;
    orm.addressableType = domain.addressableType;
    return orm;
  }
}
