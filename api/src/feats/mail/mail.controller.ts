import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import CreateSwaggerModel from '../users/swagger/create.swagger_model';
import { User } from '../users/schemas/user.schema';
import BuelerBarSwaggerModel from './swagger/BuelerBar.swagger_bodel';

@Controller('api/mail')
@ApiTags('MailService')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  /**
   * This function returns a string
   * @description Its a GET request
   * @returns
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Check if MailService is working',
    isArray: false,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getTrust() {
    return 'Trust me, I am a MailService!';
  }

  /**
   * This function sends a mail to the given email
   * @description Its a POST request
   * @param body
   * @param token
   */
  @Post('pw-forgot-send/:token')
  @ApiBody({ type: CreateSwaggerModel })
  @ApiResponse({
    status: 200,
    description: 'Send a Mail with a pw-forgot link',
    isArray: false,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'token', format: 'token', type: 'string' })
  async sendPWForgot(@Body() body: User, @Param('token') token: string) {
    await this.mailService.pwForgotSender(body, token);
  }

  /**
   * This function sends a mail to the given email
   * @description Its a POST request
   * @param email
   */
  @Post('test-mail/:email')
  @ApiBody({ type: CreateSwaggerModel })
  @ApiResponse({
    status: 200,
    description: 'Send a Mail with a pw-forgot link',
    isArray: false,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiParam({ name: 'email', format: 'email', type: 'string' })
  async sendTestMail(@Param('email') email: string) {
    await this.mailService.sendTestMail(email);
  }

  /**
   * This function sends a mail to the given email
   * 
   * @description Its a POST request
   * @param email
   * @param body
   */
  @Post('buelerbar/jobrequest')
  @ApiBody({ type: BuelerBarSwaggerModel })
  @ApiResponse({
    status: 200,
    description: 'Send a Mail with a pw-forgot link',
    isArray: false,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async sendJobRequest(@Body() body: any) {
    await this.mailService.sendMailToTeam(body);
  }

  /**
   * This function sends a mail to the given email
   * 
   * @description Its a POST request
   * @param email
   * @param body
   */
  @Post('buelerbar/contact')
  @ApiBody({ type: BuelerBarSwaggerModel })
  @ApiResponse({
    status: 200,
    description: 'Send a Mail with a pw-forgot link',
    isArray: false,
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async sendContactRequest(@Body() body: any) {
    await this.mailService.sendQuestionToTeam(body);
  }
}
