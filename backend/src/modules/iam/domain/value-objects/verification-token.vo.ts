export class VerificationToken {
  private constructor(
    private readonly value: string,
    private readonly expiresAt: Date,
  ) {}

  static create(value: string, expiresAt: Date): VerificationToken {
    return new VerificationToken(value, expiresAt);
  }

  static generate(): VerificationToken {
    const value = Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    return new VerificationToken(value, expiresAt);
  }

  getValue(): string {
    return this.value;
  }

  getExpiresAt(): Date {
    return this.expiresAt;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }
}
