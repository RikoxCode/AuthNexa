import { ApiProperty } from '@nestjs/swagger';

export class DeleteSwaggerModel {
  /**
   * This Property is used to describe the acknowledged
   * @type {boolean}
   */
  @ApiProperty()
  acknowledged: boolean;

  /**
   * This Property is used to describe the deletedCount
   * @type {number}
   */
  @ApiProperty()
  deletedCount: number;
}
