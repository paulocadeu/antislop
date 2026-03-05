import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@shared/domain/base.entity';
import { UserOrmEntity } from './user.orm-entity';

@Entity('user_preferences')
export class UserPreferencesOrmEntity extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserOrmEntity;

  @Column({ default: 'light' })
  theme: string;

  @Column({ default: 'pt-BR' })
  language: string;

  @Column({ name: 'email_notifications', default: true })
  emailNotifications: boolean;

  @Column({ name: 'phone_notifications', default: true })
  phoneNotifications: boolean;

  @Column({ name: 'accepted_terms_of_service', default: false })
  acceptedTermsOfService: boolean;
}
