import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Person } from "./person.entity";

export class CreateBookDto {
    @ApiProperty({example: 'Harry Potter Band 1', description: 'The title of the book'})
    @IsString()
    @IsNotEmpty()
    book_title: string;

    @ApiProperty({ type: () => Person, description: 'Person who owns the book' })
    @IsNotEmpty()
    person: Person;
}