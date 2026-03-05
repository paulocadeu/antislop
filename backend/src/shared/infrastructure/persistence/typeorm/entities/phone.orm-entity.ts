import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@shared/domain/base.entity';

@Entity('phones')
export class PhoneOrmEntity extends BaseEntity {
  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @Column({ name: 'phoneable_id' })
  @Index()
  phoneableId: string;

  @Column({ name: 'phoneable_type' })
  @Index()
  phoneableType: string;
}
