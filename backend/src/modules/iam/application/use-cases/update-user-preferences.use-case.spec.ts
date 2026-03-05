import { UpdateUserPreferencesUseCase } from './update-user-preferences.use-case';
import { IUserPreferencesRepository } from '../../domain/repositories/iuser-preferences.repository';
import { UserPreferences } from '../../domain/entities/user-preferences.entity';
import { TEST_CONSTANTS } from '../../../../../test/utils/test-constants';

describe('UpdateUserPreferencesUseCase', () => {
  let useCase: UpdateUserPreferencesUseCase;
  let userPreferencesRepository: jest.Mocked<IUserPreferencesRepository>;

  beforeEach(() => {
    userPreferencesRepository = {
      findByUserId: jest.fn(),
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn(),
    } as any;
    useCase = new UpdateUserPreferencesUseCase(userPreferencesRepository);
  });

  it('should successfully update existing user preferences', async () => {
    const preferences = new UserPreferences({
      userId: TEST_CONSTANTS.MOCK_UUID,
      theme: 'light',
      language: 'pt-BR',
    });

    userPreferencesRepository.findByUserId.mockResolvedValue(preferences);

    const dto = {
      theme: 'dark',
      emailNotifications: false,
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(preferences.theme).toBe('dark');
    expect(preferences.language).toBe('pt-BR'); // Unchanged
    expect(preferences.emailNotifications).toBe(false);
    expect(userPreferencesRepository.save).toHaveBeenCalledWith(preferences);
  });

  it('should create new preferences if they do not exist', async () => {
    userPreferencesRepository.findByUserId.mockResolvedValue(null);

    const dto = {
      theme: 'dark',
      language: 'en-US',
    };

    await useCase.execute(TEST_CONSTANTS.MOCK_UUID, dto);

    expect(userPreferencesRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: TEST_CONSTANTS.MOCK_UUID,
        theme: 'dark',
        language: 'en-US',
      }),
    );
  });
});
