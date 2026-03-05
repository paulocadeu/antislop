import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { IMailerService, ISendEmailOptions } from '../../application/ports/imailer.service';

@Injectable()
export class NodemailerAdapter implements IMailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST', 'localhost'),
      port: this.configService.get<number>('MAIL_PORT', 1025),
      secure: this.configService.get<boolean>('MAIL_SECURE', false),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendEmail(options: ISendEmailOptions): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM', '"Antislop" <noreply@antislop.com>'),
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }
}
