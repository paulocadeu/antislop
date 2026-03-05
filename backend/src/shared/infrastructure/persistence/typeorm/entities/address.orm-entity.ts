import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@shared/domain/base.entity';

@Entity('addresses')
export class AddressOrmEntity extends BaseEntity {
  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column({ name: 'state_province_region' })
  stateProvinceRegion: string;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column()
  country: string;

  @Column({ name: 'country_code' })
  countryCode: string;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @Column({ name: 'addressable_id' })
  @Index()
  addressableId: string;

  @Column({ name: 'addressable_type' })
  @Index()
  addressableType: string;
}
