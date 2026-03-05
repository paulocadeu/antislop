import { User, UserStatus } from './user.entity';

describe('User Entity', () => {
  it('should create a user entity with provided data', () => {
    const user = new User({
      id: 'uuid',
      email: 'test@example.com',
      passwordHash: 'hashed',
      firstName: 'John',
      lastName: 'Doe',
    });

    expect(user.id).toBe('uuid');
    expect(user.email).toBe('test@example.com');
    expect(user.firstName).toBe('John');
    expect(user.status).toBe(UserStatus.PENDING_VERIFICATION);
  });

  it('should set default status for new user', () => {
    const user = new User({});
    expect(user.status).toBe(UserStatus.PENDING_VERIFICATION);
  });

  it('should return fullName correctly', () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
    });
    expect(user.fullName).toBe('John Doe');
  });
});
