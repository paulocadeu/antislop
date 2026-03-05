import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodemailerAdapter } from '../providers/nodemailer.adapter';
import { PhoneOrmEntity } from '../persistence/typeorm/entities/phone.orm-entity';
import { AddressOrmEntity } from '../persistence/typeorm/entities/address.orm-entity';

@Global()
@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PhoneOrmEntity, AddressOrmEntity])],
  providers: [
    {
      provide: 'IMailerService',
      useClass: NodemailerAdapter,
    },
  ],
  exports: ['IMailerService', TypeOrmModule],
})
export class SharedModule {}
