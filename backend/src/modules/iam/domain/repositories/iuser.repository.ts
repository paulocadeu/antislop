import { IBaseRepository } from '@shared/domain/ibase.repository';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByActivationToken(token: string): Promise<User | null>;
}
