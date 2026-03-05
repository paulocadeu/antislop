import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '@shared/domain/address.entity';
import { Phone } from '@shared/domain/phone.entity';
import { AddressOrmEntity } from '@shared/infrastructure/persistence/typeorm/entities/address.orm-entity';
import { PhoneOrmEntity } from '@shared/infrastructure/persistence/typeorm/entities/phone.orm-entity';
import { AddressMapper } from '@shared/infrastructure/persistence/typeorm/mappers/address.mapper';
import { PhoneMapper } from '@shared/infrastructure/persistence/typeorm/mappers/phone.mapper';
import { IContactRepository } from '../../../../domain/repositories/icontact.repository';

@Injectable()
export class TypeOrmContactRepository implements IContactRepository {
  constructor(
    @InjectRepository(PhoneOrmEntity)
    private readonly phoneRepository: Repository<PhoneOrmEntity>,
    @InjectRepository(AddressOrmEntity)
    private readonly addressRepository: Repository<AddressOrmEntity>,
  ) {}

  async addPhone(phone: Phone): Promise<void> {
    const ormEntity = PhoneMapper.toPersistence(phone);
    await this.phoneRepository.save(ormEntity);
  }

  async removePhone(phoneId: string): Promise<void> {
    await this.phoneRepository.delete(phoneId);
  }

  async addAddress(address: Address): Promise<void> {
    const ormEntity = AddressMapper.toPersistence(address);
    await this.addressRepository.save(ormEntity);
  }

  async removeAddress(addressId: string): Promise<void> {
    await this.addressRepository.delete(addressId);
  }

  async findPhonesByOwner(ownerId: string, ownerType: string): Promise<Phone[]> {
    const entities = await this.phoneRepository.find({
      where: { phoneableId: ownerId, phoneableType: ownerType },
    });
    return entities.map((entity) => PhoneMapper.toDomain(entity));
  }

  async findAddressesByOwner(ownerId: string, ownerType: string): Promise<Address[]> {
    const entities = await this.addressRepository.find({
      where: { addressableId: ownerId, addressableType: ownerType },
    });
    return entities.map((entity) => AddressMapper.toDomain(entity));
  }
}
