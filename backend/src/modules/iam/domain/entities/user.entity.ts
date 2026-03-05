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
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
    if (!this.status) {
      this.status = UserStatus.PENDING_VERIFICATION;
    }
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
