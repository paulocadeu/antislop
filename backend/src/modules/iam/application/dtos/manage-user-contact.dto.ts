import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';

export enum ContactType {
  PHONE = 'phone',
  ADDRESS = 'address',
}

export enum ContactAction {
  ADD = 'add',
  REMOVE = 'remove',
}

export class ManageUserContactDto {
  @IsEnum(ContactType)
  type: ContactType;

  @IsEnum(ContactAction)
  action: ContactAction;

  @IsOptional()
  @IsString()
  contactId?: string; // Para remoção

  @IsOptional()
  phoneData?: {
    countryCode: string;
    phoneNumber: string;
    isPrimary?: boolean;
  };

  @IsOptional()
  addressData?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    stateProvinceRegion: string;
    postalCode: string;
    country: string;
    countryCode: string;
    isPrimary?: boolean;
  };
}
