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
    const url = `http://jmrservice.netshlife.dev:4200/pw-reset/${token}`;

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
      to: email,
      subject: 'Testing Nest MailerModule ✔',
      template: './test_mail',
      context: {
        url,
        site_name: 'JmrService',
      },
    });
  }

  /**
   * This function sends a mail to the Team of BuelerBar
   * 
   * @param body body of request
   */
  async sendMailToTeam(body: any) {
    // Log the request
    BaseFunctions._log(
      'Email was sendet to ' + body.email,
      '200',
      'POST',
      '/api/mail/send-mail-to-team',
    );

    // Send the mail
    this.mailerService.sendMail({
      to: 'levinzimmermann06@gmail.com',
      subject: 'Kontaktanfrage',
      template: './contact_mail',
      context: {
        body,
        site_name: 'BuelerBar',
      },
    });

    // Send a confirmation mail to the user
    this.mailerService.sendMail({
      to: body.email,
      subject: 'Kontaktanfrage',
      template: './contact_mail_confirmation',
      context: {
        body,
        site_name: 'BuelerBar',
      },
    });

    return 'Mail was sendet';
  }

  /**
   * This function sends a question to the Team of BuelerBar
   * 
   * @param body body of request
   */
  async sendQuestionToTeam(body: any) {
    // Log the request
    BaseFunctions._log(
      'Email was sendet to ' + body.email,
      '200',
      'POST',
      '/api/mail/send-question-to-team',
    );

    // Send the mail
    this.mailerService.sendMail({
      to: 'levinzimmermann06@gmail.com',
      subject: 'Frage von ' + body.firstname + ' ' + body.lastname,
      template: './question_to_mail',
      context: {
        body,
        site_name: 'BuelerBar',
      },
    });

    // Send a confirmation mail to the user
    this.mailerService.sendMail({
      to: body.email,
      subject: 'Frage von ' + body.firstname + ' ' + body.lastname,
      template: './contact_mail_confirmation',
      context: {
        body,
        site_name: 'BuelerBar',
      },
    });

    return 'Mail was sendet';
  }
}
