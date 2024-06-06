import { ApiTags } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { Person } from "../entities/person.entity";
import { Body, UnauthorizedException, Controller, Inject, Post, Query, HttpStatus, HttpException } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { LoginPersonDto } from "../entities/loginPerson.dto";

@ApiTags("login")
@Controller("login")
export class LoginController {
  @Inject(LoginService)
  private readonly service: LoginService;

  @Post()
  @ApiOperation({ summary: "Login user with username and password" })
  @ApiResponse({ status: 201, description: "Login successfull", type: Person })
  @ApiResponse({ status: 401, description: "Login credentials wrong" })
  @ApiResponse({ status: 400, description: "Error: Bad Request" })
  @ApiBody({ description: "Person to insert", type: LoginPersonDto })
  public async(@Body() body: LoginPersonDto): Promise<Person> {
    try {
      return this.service.login(body.username, body.password);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException("Login credentials wrong", HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
