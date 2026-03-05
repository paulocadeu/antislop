import { UserPreferences } from './user-preferences.entity';
import { VerificationToken } from '../value-objects/verification-token.vo';

export enum UserStatus {
  PENDING_VERIFICATION = 'pending_verification',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  taxId?: string;
  status: UserStatus;
  avatar?: string;
  activationToken?: string;
  activationTokenExpiresAt?: Date;
  preferences?: UserPreferences;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
    if (!this.status) {
      this.status = UserStatus.PENDING_VERIFICATION;
    }
  }

  generateActivationToken(): void {
    const token = VerificationToken.generate();
    this.activationToken = token.getValue();
    this.activationTokenExpiresAt = token.getExpiresAt();
  }

  isTokenExpired(): boolean {
    if (!this.activationTokenExpiresAt) return true;
    return new Date() > this.activationTokenExpiresAt;
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
