import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('AppService')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * This function returns a string
   * @description Its a GET request
   * @returns
   */
  @Get()
  @ApiOperation({ summary: 'Return redirect page' })
  @ApiResponse({ status: 200, description: 'Return redirect page' })
  getIndexFile(): string {
    return this.appService.getIndexFile();
  }
}
