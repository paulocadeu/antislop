export class UserPreferences {
  id?: string;
  userId: string;
  theme: string;
  language: string;
  emailNotifications: boolean;
  phoneNotifications: boolean;
  acceptedTermsOfService: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<UserPreferences>) {
    Object.assign(this, props);
    if (this.emailNotifications === undefined) this.emailNotifications = true;
    if (this.phoneNotifications === undefined) this.phoneNotifications = true;
    if (this.acceptedTermsOfService === undefined) this.acceptedTermsOfService = false;
    if (!this.theme) this.theme = 'light';
    if (!this.language) this.language = 'pt-BR';
  }
}
