import { PersonsService } from "./persons.service";
import { UseGuards, Controller, Get, Inject, Param, NotFoundException, UsePipes, ValidationPipe, ParseIntPipe } from "@nestjs/common";
import { Person } from "../entities/person.entity";
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from "@nestjs/swagger";

@ApiTags("persons")
@Controller("persons")
export class PersonsController {
  @Inject(PersonsService)
  private readonly service: PersonsService;

  /*@Get()
  @ApiOperation({ summary: "Get all persons" })
  @ApiResponse({ status: 200, description: "Return all persons", type: [Person] })
  public getAllUser(): Promise<Person[]> {
    return this.service.getAllUsers();
  }

  @Get(":id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: "Get person by ID" })
  @ApiResponse({ status: 200, description: "Return the person with the specific ID", type: Person })
  @ApiResponse({ status: 404, description: "Person not found" })
  @ApiResponse({ status: 400, description: "Id is in wrong format." })
  @ApiParam({ name: "id", example: 1, type: Number, description: "ID of the person" })
  public async getUser(@Param("id", ParseIntPipe) id: number): Promise<Person> {
    const user = await this.service.getUser(id);

    if (!user) {
      throw new NotFoundException("Person not found");
    } else {
      return user;
    }
  }*/
}
