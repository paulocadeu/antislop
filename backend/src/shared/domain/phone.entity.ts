export class Phone {
  id?: string;
  countryCode: string;
  phoneNumber: string;
  isPrimary: boolean;
  phoneableId: string;
  phoneableType: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<Phone>) {
    Object.assign(this, props);
    if (this.isPrimary === undefined) this.isPrimary = false;
  }
}
