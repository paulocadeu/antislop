import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import { UserOrmEntity } from '../persistence/typeorm/entities/user.orm-entity';
import { TypeOrmUserRepository } from '../persistence/typeorm/repositories/typeorm-user.repository';
import { BcryptHashService } from '../security/bcrypt-hash.service';
import { AuthController } from '../../presentation/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    TypeOrmUserRepository,
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'IHashService',
      useClass: BcryptHashService,
    },
  ],
  exports: [RegisterUserUseCase],
})
export class IamModule {}
