import { ApiProperty } from '@nestjs/swagger';

export default class CreateSwaggerModel {
  @ApiProperty({
    description: 'Name of Customer / User',
  })
  readonly username: string;

  @ApiProperty({
    description: 'Offical Email of Customer / User',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Password of Customer / User'
  })
  readonly password: string;
}
