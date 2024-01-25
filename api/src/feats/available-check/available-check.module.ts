import { Module } from '@nestjs/common';
import { AvailableCheckController } from './available-check.controller';

@Module({
  controllers: [AvailableCheckController],
})
export class AvailableCheckModule {}
