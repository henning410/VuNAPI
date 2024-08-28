import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePersonDto {
    @ApiProperty({ example: 'john_doe', description: 'The username of the person' })
    @IsString()
    @IsNotEmpty()
    username: string;
}