import {
  Controller,
  Patch,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUserProfileUseCase } from '../../application/use-cases/update-user-profile.use-case';
import { UpdateUserPreferencesUseCase } from '../../application/use-cases/update-user-preferences.use-case';
import { ManageUserContactUseCase } from '../../application/use-cases/manage-user-contact.use-case';
import { UpdateUserProfileDto } from '../../application/dtos/update-user-profile.dto';
import { UpdateUserPreferencesDto } from '../../application/dtos/update-user-preferences.dto';
import { ManageUserContactDto, ContactAction, ContactType } from '../../application/dtos/manage-user-contact.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UserController {
  constructor(
    private readonly updateUserProfileUseCase: UpdateUserProfileUseCase,
    private readonly updateUserPreferencesUseCase: UpdateUserPreferencesUseCase,
    private readonly manageUserContactUseCase: ManageUserContactUseCase,
  ) {}

  @Patch(':id/profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar perfil do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso.' })
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateUserProfileDto) {
    await this.updateUserProfileUseCase.execute(id, dto);
    return { message: 'Profile updated successfully.' };
  }

  @Patch(':id/preferences')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar preferências do usuário' })
  @ApiResponse({ status: 200, description: 'Preferências atualizadas com sucesso.' })
  async updatePreferences(@Param('id') id: string, @Body() dto: UpdateUserPreferencesDto) {
    await this.updateUserPreferencesUseCase.execute(id, dto);
    return { message: 'Preferences updated successfully.' };
  }

  @Post(':id/contacts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Adicionar contato ao usuário' })
  @ApiResponse({ status: 200, description: 'Contato adicionado com sucesso.' })
  async addContact(@Param('id') id: string, @Body() dto: ManageUserContactDto) {
    dto.action = ContactAction.ADD;
    await this.manageUserContactUseCase.execute(id, dto);
    return { message: 'Contact added successfully.' };
  }

  @Delete(':id/contacts/:contactId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover contato do usuário' })
  @ApiResponse({ status: 200, description: 'Contato removido com sucesso.' })
  async removeContact(
    @Param('id') id: string,
    @Param('contactId') contactId: string,
    @Query('type') type: ContactType,
  ) {
    const dto: ManageUserContactDto = {
      type,
      action: ContactAction.REMOVE,
      contactId,
    };
    await this.manageUserContactUseCase.execute(id, dto);
    return { message: 'Contact removed successfully.' };
  }
}
