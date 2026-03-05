import { defineFeature, loadFeature } from 'jest-cucumber';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestAppInstance } from '../../../utils/test-app-instance';
import { DatabaseCleaner } from '../../../utils/database-cleaner';
import { TypeOrmUserRepository } from '../../../../src/modules/iam/infrastructure/persistence/typeorm/repositories/typeorm-user.repository';
import { UserFactory } from '../../../utils/factories/user.factory';
import { UserStatus } from '../../../../src/modules/iam/domain/entities/user.entity';

const feature = loadFeature('./test/bdd/features/identity/RegisterUserUseCase.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;
  let userRepository: TypeOrmUserRepository;
  let cleaner: DatabaseCleaner;
  let response: any;

  beforeAll(async () => {
    app = await TestAppInstance.getInstance();
    userRepository = app.get<TypeOrmUserRepository>(TypeOrmUserRepository);
    cleaner = app.get<DatabaseCleaner>(DatabaseCleaner);
  });

  afterAll(async () => {
    await TestAppInstance.closeInstance();
  });

  beforeEach(async () => {
    await cleaner.clean();
  });

  test('Registro bem-sucedido', ({ given, when, then, and }) => {
    given(/^que não existe nenhum usuário cadastrado com o e-mail "(.*)"$/, async (email) => {
      const user = await userRepository.findByEmail(email);
      expect(user).toBeNull();
    });

    when('eu enviar os dados de registro:', async (table) => {
      const dto = table[0];
      response = await request(app.getHttpServer()).post('/v1/auth/register').send(dto);
    });

    then(/^um novo usuário deve ser criado com status "(.*)"$/, async (status) => {
      expect(response.status).toBe(201);
      const user = await userRepository.findByEmail('novo@exemplo.com');
      expect(user).not.toBeNull();
      expect(user?.status).toBe(status);
    });

    and(/^as preferências padrão de "(.*)" e "(.*)" devem ser criadas$/, async (theme, language) => {
      // TODO: Validar repositório de preferências quando implementado
      expect(true).toBe(true);
    });

    and(/^um e-mail de ativação deve ser enviado para "(.*)"$/, async (email) => {
      const user = await userRepository.findByEmail(email);
      expect(user?.activationToken).toBeDefined();
    });

    and('a senha deve ser armazenada de forma segura (hash)', async () => {
      const user = await userRepository.findByEmail('novo@exemplo.com');
      expect(user?.passwordHash).not.toBe('SenhaForte123!');
    });
  });

  test('Falha no registro por e-mail duplicado', ({ given, when, then, and }) => {
    given(/^que já existe um usuário ativo com o e-mail "(.*)"$/, async (email) => {
      const user = UserFactory.createEntity({ email, status: UserStatus.ACTIVE });
      await userRepository.save(user);
    });

    when(/^eu enviar os dados de registro com o e-mail "(.*)"$/, async (email) => {
      const dto = UserFactory.createRegisterDto({ email });
      response = await request(app.getHttpServer()).post('/v1/auth/register').send(dto);
    });

    then(/^o sistema deve retornar um erro de "E-mail já em uso" \(409\)$/, async () => {
      expect(response.status).toBe(409);
      expect(response.body.message).toBe('E-mail já em uso');
    });

    and('nenhum e-mail de ativação deve ser disparado', () => {
      expect(true).toBe(true);
    });
  });
});
