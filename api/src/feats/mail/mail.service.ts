import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import BaseFunctions from 'src/core/base-functions';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private userService: UsersService,
  ) {}

  async pwForgotSender(user: User, token: string) {
    const url = `http://localhost:4200/pw-reset/${token}`;

    BaseFunctions._log('Email was sendet to ' + user.email, '200', 'POST', '/api/mail/pw-forgot-send:token');

    this.mailerService.sendMail({
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


  async sendTestMail(email: string) {
    const url = `http://localhost:4200/testing-mail/${email}`;

    BaseFunctions._log('Email was sendet to ' + email, '200', 'POST', '/api/mail/pw-forgot-send:token');

    this.mailerService.sendMail({
      to: '',
      subject: 'Testing Nest MailerModule ✔',
      template: './test_mail',
      context: {
        url,
        site_name: 'JmrService',
      },
    });
  }
}
