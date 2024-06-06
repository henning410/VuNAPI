import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

export class GetPersonDto {
    @ApiProperty({example: '1', description: 'The ID of the person'})
    @IsNumberString()
    id: string;
}