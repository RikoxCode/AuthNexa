import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('AppService')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Return redirect page' })
  @ApiResponse({ status: 200, description: 'Return redirect page' })
  getIndexFile(): string {
    return this.appService.getIndexFile();
  }
}