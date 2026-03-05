import { BaseEntity } from '@shared/domain/base.entity';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserStatus } from '../../../../domain/entities/user.entity';
import { UserPreferencesOrmEntity } from './user-preferences.orm-entity';

@Entity('users')
export class UserOrmEntity extends BaseEntity {
  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'tax_id', nullable: true })
  @Index({ unique: true })
  taxId: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING_VERIFICATION,
  })
  status: UserStatus;

  @Column({ nullable: true })
  avatar: string;

  @Column({ name: 'activation_token', nullable: true })
  @Index({ unique: true })
  activationToken: string;

  @Column({ name: 'activation_token_expires_at', type: 'timestamptz', nullable: true })
  activationTokenExpiresAt: Date;

  @OneToOne(() => UserPreferencesOrmEntity, (preferences) => preferences.user, {
    cascade: true,
  })
  preferences: UserPreferencesOrmEntity;
}
