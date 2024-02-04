import { ApiProperty } from '@nestjs/swagger';

export default class BuelerBarSwaggerModel {
    @ApiProperty({
        description: 'Name of Customer / User',
    })
    readonly firstname: string;

    @ApiProperty({
        description: 'Lastname of Customer / User',
    })
    readonly lastname: string;

    @ApiProperty({
        description: 'Email of Customer / User',
    })
    readonly email: string;

    @ApiProperty({
        description: 'Job of Customer / User',
    })
    readonly job: string;

    @ApiProperty({
        description: 'Phone of Customer / User',
    })
    readonly phone: string;

    @ApiProperty({
        description: 'Image of Customer / User',
    })
    readonly image: string;

    @ApiProperty({
        description: 'Message of Customer / User',
    })
    readonly message: string;

}
