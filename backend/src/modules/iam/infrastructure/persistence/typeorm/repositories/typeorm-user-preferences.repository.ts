import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from '../../../../domain/entities/user-preferences.entity';
import { IUserPreferencesRepository } from '../../../../domain/repositories/iuser-preferences.repository';
import { UserPreferencesOrmEntity } from '../entities/user-preferences.orm-entity';
import { UserPreferencesMapper } from '../mappers/user-preferences.mapper';

@Injectable()
export class TypeOrmUserPreferencesRepository implements IUserPreferencesRepository {
  constructor(
    @InjectRepository(UserPreferencesOrmEntity)
    private readonly repository: Repository<UserPreferencesOrmEntity>,
  ) {}

  async save(preferences: UserPreferences): Promise<UserPreferences> {
    const ormEntity = UserPreferencesMapper.toPersistence(preferences);
    const savedEntity = await this.repository.save(ormEntity);
    return UserPreferencesMapper.toDomain(savedEntity);
  }

  async findByUserId(userId: string): Promise<UserPreferences | null> {
    const ormEntity = await this.repository.findOne({ where: { userId } });
    return ormEntity ? UserPreferencesMapper.toDomain(ormEntity) : null;
  }

  async findById(id: string): Promise<UserPreferences | null> {
    const ormEntity = await this.repository.findOne({ where: { id } } as any);
    return ormEntity ? UserPreferencesMapper.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<UserPreferences[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => UserPreferencesMapper.toDomain(entity));
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
