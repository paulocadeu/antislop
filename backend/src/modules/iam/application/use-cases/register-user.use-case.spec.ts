import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.use-case';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { IHashService } from '../ports/ihash.service';
import { UserFactory } from '../../../../../test/utils/factories/user.factory';
import { ConflictException } from '@nestjs/common';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let hashService: jest.Mocked<IHashService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: 'IUserRepository',
          useValue: {
            findByEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: 'IHashService',
          useValue: {
            hash: jest.fn().mockResolvedValue('hashed-password'),
            compare: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    userRepository = module.get('IUserRepository');
    hashService = module.get('IHashService');
  });

  it('should register a new user successfully', async () => {
    const dto = UserFactory.createRegisterDto();
    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockImplementation(async (user) => {
      user.id = 'uuid';
      return user;
    });

    const result = await useCase.execute(dto);

    expect(result.id).toBe('uuid');
    expect(result.email).toBe(dto.email);
    expect(hashService.hash).toHaveBeenCalledWith(dto.password);
    expect(userRepository.save).toHaveBeenCalled();
  });

  it('should throw ConflictException if user already exists', async () => {
    const dto = UserFactory.createRegisterDto();
    const existingUser = UserFactory.createEntity({ email: dto.email });
    userRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
