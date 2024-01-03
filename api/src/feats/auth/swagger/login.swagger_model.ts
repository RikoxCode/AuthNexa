import { ApiProperty } from '@nestjs/swagger';

export default class LoginSwaggerModel {
  @ApiProperty({
    description: 'Name of Customer / User',
  })
  readonly username: string;

  @ApiProperty({
    description: 'Password of Customer / User',
  })
  readonly password: string;
}
