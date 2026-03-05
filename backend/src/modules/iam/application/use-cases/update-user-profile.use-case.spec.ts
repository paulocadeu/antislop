import { UpdateUserProfileUseCase } from './update-user-profile.use-case';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UserFactory } from '../../../../../test/utils/factories/user.factory';
import { TEST_CONSTANTS } from '../../../../../test/utils/test-constants';

describe('UpdateUserProfileUseCase', () => {
  let useCase: UpdateUserProfileUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      findByActivationToken: jest.fn(),
      delete: jest.fn(),
    } as any;
    useCase = new UpdateUserProfileUseCase(userRepository);
  });

  it('should successfully update user profile fields', async () => {
    const user = UserFactory.createEntity({
      id: TEST_CONSTANTS.MOCK_UUID,
      firstName: 'OldName',
      lastName: 'OldLastName',
    });

    userRepository.findById.mockResolvedValue(user);

    const dto = {
      firstName: 'NewName',
      lastName: 'NewLastName',
      avatar: 'https://newavatar.com/img.jpg',
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(user.firstName).toBe(dto.firstName);
    expect(user.lastName).toBe(dto.lastName);
    expect(user.avatar).toBe(dto.avatar);
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });

  it('should partially update user profile fields', async () => {
    const user = UserFactory.createEntity({
      id: TEST_CONSTANTS.MOCK_UUID,
      firstName: 'OldName',
      lastName: 'OldLastName',
    });

    userRepository.findById.mockResolvedValue(user);

    const dto = {
      firstName: 'OnlyNewName',
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(user.firstName).toBe(dto.firstName);
    expect(user.lastName).toBe('OldLastName'); // Should not change
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });

  it('should throw an error if user is not found', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute(TEST_CONSTANTS.MOCK_UUID, { firstName: 'New' }),
    ).rejects.toThrow('User not found.');
  });
});
