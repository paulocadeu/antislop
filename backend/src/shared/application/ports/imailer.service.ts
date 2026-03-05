export interface ISendEmailOptions {
  to: string;
  subject: string;
  template?: string;
  context?: any;
  text?: string;
  html?: string;
}

export interface IMailerService {
  sendEmail(options: ISendEmailOptions): Promise<void>;
}
