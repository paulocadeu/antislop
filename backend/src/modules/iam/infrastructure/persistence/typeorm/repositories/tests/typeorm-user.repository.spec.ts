import { TestAppInstance } from '../../../../../../../../test/utils/test-app-instance';
import { DatabaseCleaner } from '../../../../../../../../test/utils/database-cleaner';
import { TypeOrmUserRepository } from '../typeorm-user.repository';
import { UserFactory } from '../../../../../../../../test/utils/factories/user.factory';
import { TEST_CONSTANTS } from '../../../../../../../../test/utils/test-constants';
import { UserStatus } from '../../../../../domain/entities/user.entity';

describe('TypeOrmUserRepository (Integration)', () => {
  let repository: TypeOrmUserRepository;
  let cleaner: DatabaseCleaner;

  beforeAll(async () => {
    const app = await TestAppInstance.getInstance();
    repository = app.get<TypeOrmUserRepository>(TypeOrmUserRepository);
    cleaner = app.get<DatabaseCleaner>(DatabaseCleaner);
  });

  afterAll(async () => {
    await TestAppInstance.closeInstance();
  });

  beforeEach(async () => {
    await cleaner.clean();
  });

  it('should successfully persist a user', async () => {
    const user = UserFactory.createEntity({
      email: 'persist@example.com',
      firstName: 'Integration',
      lastName: 'Test',
    });

    const savedUser = await repository.save(user);

    expect(savedUser.id).toBeDefined();
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.fullName).toBe('Integration Test');

    const foundUser = await repository.findById(savedUser.id!);
    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toBe(user.email);
  });

  it('should find user by email', async () => {
    const user = UserFactory.createEntity({ email: TEST_CONSTANTS.VALID_EMAIL });
    await repository.save(user);

    const foundUser = await repository.findByEmail(TEST_CONSTANTS.VALID_EMAIL);

    expect(foundUser).not.toBeNull();
    expect(foundUser?.email).toBe(TEST_CONSTANTS.VALID_EMAIL);
  });

  it('should find user by activation token', async () => {
    const user = UserFactory.createEntity({
      activationToken: TEST_CONSTANTS.VALID_ACTIVATION_TOKEN,
    });
    await repository.save(user);

    const foundUser = await repository.findByActivationToken(TEST_CONSTANTS.VALID_ACTIVATION_TOKEN);

    expect(foundUser).not.toBeNull();
    expect(foundUser?.activationToken).toBe(TEST_CONSTANTS.VALID_ACTIVATION_TOKEN);
  });

  it('should return null if user not found', async () => {
    const foundUser = await repository.findById('550e8400-e29b-41d4-a716-446655449999');
    expect(foundUser).toBeNull();
  });

  it('should remove a user', async () => {
    const user = UserFactory.createEntity({ email: 'delete@example.com' });
    const savedUser = await repository.save(user);

    await repository.remove(savedUser.id!);

    const foundUser = await repository.findById(savedUser.id!);
    expect(foundUser).toBeNull();
  });
});
