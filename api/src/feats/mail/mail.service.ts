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

  /**
   * This function sends a mail to the given email
   * Is used to send a mail if the user forgot his password
   * @param email
   */
  async pwForgotSender(user: User, token: string) {
    const url = `http://localhost:4200/pw-reset/${token}`;

    // Log the request
    BaseFunctions._log(
      'Email was sendet to ' + user.email,
      '200',
      'POST',
      '/api/mail/pw-forgot-send:token',
    );

    // Send the mail
    this.mailerService.sendMail({
      to: user.email,
      subject: 'Password reset',
      template: './pw_forgot',
      context: {
        user: user,
        url,
        site_name: 'JmrService',
        expiration_time: '15 minutes',
      },
    });
  }

  /**
   * This function sends a test mail to the given email
   * Is used to test the mailer module
   * @param email
   */
  async sendTestMail(email: string) {
    const url = `http://localhost:4200/testing-mail/${email}`;

    // Log the request
    BaseFunctions._log(
      'Email was sendet to ' + email,
      '200',
      'POST',
      '/api/mail/pw-forgot-send:token',
    );

    // Send the mail
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
