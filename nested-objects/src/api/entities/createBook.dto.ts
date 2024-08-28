import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Person } from "./person.entity";
import { Type } from "class-transformer";
import { CreatePersonDto } from "./createPerson.dto";

export class CreateBookDto {
    @ApiProperty({ example: 'Harry Potter Band 1', description: 'The title of the book' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 1, description: 'The ID of the person'})
    @IsInt()
    person_id: number;
}