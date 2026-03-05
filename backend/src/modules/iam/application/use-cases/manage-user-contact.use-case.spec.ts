import { ManageUserContactUseCase } from './manage-user-contact.use-case';
import { IContactRepository } from '../../domain/repositories/icontact.repository';
import { ContactType, ContactAction } from '../dtos/manage-user-contact.dto';
import { TEST_CONSTANTS } from '../../../../../test/utils/test-constants';

describe('ManageUserContactUseCase', () => {
  let useCase: ManageUserContactUseCase;
  let contactRepository: jest.Mocked<IContactRepository>;

  beforeEach(() => {
    contactRepository = {
      addPhone: jest.fn(),
      removePhone: jest.fn(),
      addAddress: jest.fn(),
      removeAddress: jest.fn(),
      findPhonesByOwner: jest.fn(),
      findAddressesByOwner: jest.fn(),
    };
    useCase = new ManageUserContactUseCase(contactRepository);
  });

  it('should successfully add a new phone to user', async () => {
    const dto = {
      type: ContactType.PHONE,
      action: ContactAction.ADD,
      phoneData: {
        countryCode: '55',
        phoneNumber: '11999999999',
        isPrimary: true,
      },
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(contactRepository.addPhone).toHaveBeenCalledWith(
      expect.objectContaining({
        phoneableId: TEST_CONSTANTS.MOCK_UUID,
        phoneableType: 'user',
        countryCode: '55',
        phoneNumber: '11999999999',
      }),
    );
  });

  it('should successfully add a new address to user', async () => {
    const dto = {
      type: ContactType.ADDRESS,
      action: ContactAction.ADD,
      addressData: {
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro',
        city: 'Cidade',
        stateProvinceRegion: 'Estado',
        postalCode: '12345-678',
        country: 'Brasil',
        countryCode: 'BRA',
      },
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(contactRepository.addAddress).toHaveBeenCalledWith(
      expect.objectContaining({
        addressableId: TEST_CONSTANTS.MOCK_UUID,
        addressableType: 'user',
        street: 'Rua Teste',
      }),
    );
  });

  it('should successfully remove a phone from user', async () => {
    const dto = {
      type: ContactType.PHONE,
      action: ContactAction.REMOVE,
      contactId: 'phone-id-123',
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(contactRepository.removePhone).toHaveBeenCalledWith('phone-id-123');
  });
});
