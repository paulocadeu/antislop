export class Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  stateProvinceRegion: string;
  postalCode: string;
  country: string;
  countryCode: string;
  isPrimary: boolean;
  addressableId: string;
  addressableType: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: Partial<Address>) {
    Object.assign(this, props);
    if (this.isPrimary === undefined) this.isPrimary = false;
  }
}
