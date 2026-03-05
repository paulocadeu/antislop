import { Phone } from '@shared/domain/phone.entity';
import { Address } from '@shared/domain/address.entity';

export interface IContactRepository {
  addPhone(phone: Phone): Promise<void>;
  removePhone(phoneId: string): Promise<void>;
  addAddress(address: Address): Promise<void>;
  removeAddress(addressId: string): Promise<void>;
  findPhonesByOwner(ownerId: string, ownerType: string): Promise<Phone[]>;
  findAddressesByOwner(ownerId: string, ownerType: string): Promise<Address[]>;
}
