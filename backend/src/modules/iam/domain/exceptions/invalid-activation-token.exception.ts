export class InvalidActivationTokenException extends Error {
  constructor() {
    super('Invalid or expired activation token.');
    this.name = 'InvalidActivationTokenException';
  }
}
