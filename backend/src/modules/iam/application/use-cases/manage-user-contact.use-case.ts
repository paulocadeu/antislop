import { IContactRepository } from '../../domain/repositories/icontact.repository';
import { ManageUserContactDto, ContactType, ContactAction } from '../dtos/manage-user-contact.dto';
import { Phone } from '@shared/domain/phone.entity';
import { Address } from '@shared/domain/address.entity';

export class ManageUserContactUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(userId: string, dto: ManageUserContactDto): Promise<void> {
    const { type, action } = dto;

    if (type === ContactType.PHONE) {
      if (action === ContactAction.ADD) {
        if (!dto.phoneData) throw new Error('Phone data is required for ADD action.');
        const phone = new Phone({
          ...dto.phoneData,
          phoneableId: userId,
          phoneableType: 'user',
        });
        await this.contactRepository.addPhone(phone);
      } else {
        if (!dto.contactId) throw new Error('Contact ID is required for REMOVE action.');
        await this.contactRepository.removePhone(dto.contactId);
      }
    } else if (type === ContactType.ADDRESS) {
      if (action === ContactAction.ADD) {
        if (!dto.addressData) throw new Error('Address data is required for ADD action.');
        const address = new Address({
          ...dto.addressData,
          addressableId: userId,
          addressableType: 'user',
        });
        await this.contactRepository.addAddress(address);
      } else {
        if (!dto.contactId) throw new Error('Contact ID is required for REMOVE action.');
        await this.contactRepository.removeAddress(dto.contactId);
      }
    }
  }
}
