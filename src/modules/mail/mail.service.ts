import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async handleSendEmail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Test mail',
      template: './job',
    });
  }
}
