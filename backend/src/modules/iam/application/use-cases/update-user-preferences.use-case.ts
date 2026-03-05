import { IUserPreferencesRepository } from '../../domain/repositories/iuser-preferences.repository';
import { UserPreferences } from '../../domain/entities/user-preferences.entity';
import { UpdateUserPreferencesDto } from '../dtos/update-user-preferences.dto';

export class UpdateUserPreferencesUseCase {
  constructor(private readonly userPreferencesRepository: IUserPreferencesRepository) {}

  async execute(userId: string, dto: UpdateUserPreferencesDto): Promise<void> {
    let preferences = await this.userPreferencesRepository.findByUserId(userId);

    if (!preferences) {
      preferences = new UserPreferences({ userId, ...dto });
    } else {
      if (dto.theme !== undefined) preferences.theme = dto.theme;
      if (dto.language !== undefined) preferences.language = dto.language;
      if (dto.emailNotifications !== undefined)
        preferences.emailNotifications = dto.emailNotifications;
      if (dto.phoneNotifications !== undefined)
        preferences.phoneNotifications = dto.phoneNotifications;
      if (dto.acceptedTermsOfService !== undefined)
        preferences.acceptedTermsOfService = dto.acceptedTermsOfService;
    }

    await this.userPreferencesRepository.save(preferences);
  }
}
