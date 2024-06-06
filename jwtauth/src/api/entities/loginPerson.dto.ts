import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginPersonDto {
  @ApiProperty({ example: "john_doe", description: "The username of the person" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "password1234", description: "The password of the person" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
