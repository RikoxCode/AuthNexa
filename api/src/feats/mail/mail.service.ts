import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import BaseFunctions from 'src/core/base-functions';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async pwForgotSender(user: User, token: string) {
    const url = `http://localhost:4200/pw-reset/${token}`;

    BaseFunctions._log('Email was sendet to ' + user.email, '200', 'POST', '/api/mail/pw-forgot-send:token');

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: './pw_forgot',
      context: {
        user: user,
        url,
        site_name: 'JmrService',
        expiration_time: '15 minutes'
      },
    });
  }
}
