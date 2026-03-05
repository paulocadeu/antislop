import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { VerifyUserEmailUseCase } from '../../application/use-cases/verify-user-email.use-case';
import { UpdateUserProfileUseCase } from '../../application/use-cases/update-user-profile.use-case';
import { UpdateUserPreferencesUseCase } from '../../application/use-cases/update-user-preferences.use-case';
import { ManageUserContactUseCase } from '../../application/use-cases/manage-user-contact.use-case';
import { UserOrmEntity } from '../persistence/typeorm/entities/user.orm-entity';
import { UserPreferencesOrmEntity } from '../persistence/typeorm/entities/user-preferences.orm-entity';
import { TypeOrmUserRepository } from '../persistence/typeorm/repositories/typeorm-user.repository';
import { TypeOrmUserPreferencesRepository } from '../persistence/typeorm/repositories/typeorm-user-preferences.repository';
import { TypeOrmContactRepository } from '../persistence/typeorm/repositories/typeorm-contact.repository';
import { BcryptHashService } from '../security/bcrypt-hash.service';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { UserController } from '../../presentation/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity, UserPreferencesOrmEntity])],
  controllers: [AuthController, UserController],
  providers: [
    RegisterUserUseCase,
    VerifyUserEmailUseCase,
    UpdateUserProfileUseCase,
    UpdateUserPreferencesUseCase,
    ManageUserContactUseCase,
    TypeOrmUserRepository,
    TypeOrmUserPreferencesRepository,
    TypeOrmContactRepository,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'IUserPreferencesRepository',
      useClass: TypeOrmUserPreferencesRepository,
    },
    {
      provide: 'IContactRepository',
      useClass: TypeOrmContactRepository,
    },
    {
      provide: 'IHashService',
      useClass: BcryptHashService,
    },
  ],
  exports: [
    RegisterUserUseCase,
    VerifyUserEmailUseCase,
    UpdateUserProfileUseCase,
    UpdateUserPreferencesUseCase,
    ManageUserContactUseCase,
  ],
})
export class IamModule {}
