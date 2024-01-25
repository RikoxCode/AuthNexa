import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('AvailableCheck')
@Controller('api/available-check')
export class AvailableCheckController {
  constructor() {}

  @Get('test-connection')
  @ApiResponse({
    status: 200,
    description: 'Connection to the API is working',
  })
  async testConnection() {
    return {
      status: 'ok',
      statusCode: 200,
      message: 'Connection to the API is working',
    };
  }
}
