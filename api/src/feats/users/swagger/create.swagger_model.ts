import { ApiProperty } from '@nestjs/swagger';

export default class CreateSwaggerModel {
  /**
   * This Property is used to describe the username
   * @type {string}
   */
  @ApiProperty({
    description: 'Name of Customer / User',
  })
  readonly username: string;

  /**
   * This Property is used to describe the email
   * @type {string}
   */
  @ApiProperty({
    description: 'Offical Email of Customer / User',
  })
  readonly email: string;

  /**
   * This Property is used to describe the password
   * @type {string}
   */
  @ApiProperty({
    description: 'Password of Customer / User',
  })
  readonly password: string;
}
