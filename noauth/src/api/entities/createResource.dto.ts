import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateResourceDto {
    @ApiProperty({ example: 'TestResource', description: 'Name of the resource' })
    @IsString()
    @IsNotEmpty()
    name: string;
}