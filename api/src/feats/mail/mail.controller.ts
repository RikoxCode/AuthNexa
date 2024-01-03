import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import CreateSwaggerModel from '../users/swagger/create.swagger_model';
import { User } from '../users/schemas/user.schema';


@Controller('api/mail')
@ApiTags('MailService')
export class MailController {
  constructor(private readonly mailService: MailService) {}

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

  @Post('pw-forgot-send/:token')
  @ApiBody({ type:  CreateSwaggerModel})
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
}
