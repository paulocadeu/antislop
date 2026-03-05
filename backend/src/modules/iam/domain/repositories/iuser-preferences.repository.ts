import { IBaseRepository } from '@shared/domain/ibase.repository';
import { UserPreferences } from '../entities/user-preferences.entity';

export interface IUserPreferencesRepository extends IBaseRepository<UserPreferences> {
  findByUserId(userId: string): Promise<UserPreferences | null>;
}
