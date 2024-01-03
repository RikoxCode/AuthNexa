import { ApiProperty } from '@nestjs/swagger';

export class DeleteSwaggerModel {
    @ApiProperty()
    acknowledged: boolean;
    
    @ApiProperty()
    deletedCount: number;
}