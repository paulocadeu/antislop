import { VerifyUserEmailUseCase } from './verify-user-email.use-case';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { UserFactory } from '../../../../../test/utils/factories/user.factory';
import { TEST_CONSTANTS } from '../../../../../test/utils/test-constants';
import { UserStatus } from '../../domain/entities/user.entity';

describe('VerifyUserEmailUseCase', () => {
  let useCase: VerifyUserEmailUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findByActivationToken: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByEmail: jest.fn(),
      delete: jest.fn(),
    } as any;
    useCase = new VerifyUserEmailUseCase(userRepository);
  });

  it('should successfully activate a user account', async () => {
    const user = UserFactory.createEntity({
      status: UserStatus.PENDING_VERIFICATION,
      activationToken: TEST_CONSTANTS.VALID_ACTIVATION_TOKEN,
      activationTokenExpiresAt: new Date(Date.now() + 3600000), // Válido por 1h
    });

    userRepository.findByActivationToken.mockResolvedValue(user);

    await useCase.execute(TEST_CONSTANTS.VALID_ACTIVATION_TOKEN);

    expect(user.status).toBe(UserStatus.ACTIVE);
    expect(user.activationToken).toBeUndefined();
    expect(user.activationTokenExpiresAt).toBeUndefined();
    expect(userRepository.save).toHaveBeenCalledWith(user);
  });

  it('should throw an error if token is not found', async () => {
    userRepository.findByActivationToken.mockResolvedValue(null);

    await expect(useCase.execute('invalid-token')).rejects.toThrow('Invalid or expired activation token.');
  });

  it('should throw an error if token is expired', async () => {
    const user = UserFactory.createEntity({
      status: UserStatus.PENDING_VERIFICATION,
      activationToken: TEST_CONSTANTS.VALID_ACTIVATION_TOKEN,
      activationTokenExpiresAt: new Date(Date.now() - 3600000), // Expirado há 1h
    });

    userRepository.findByActivationToken.mockResolvedValue(user);

    await expect(useCase.execute(TEST_CONSTANTS.VALID_ACTIVATION_TOKEN)).rejects.toThrow('Invalid or expired activation token.');
  });
});
