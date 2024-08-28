import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UsePipes, ValidationPipe, Param, NotFoundException, HttpException, HttpStatus, ConflictException, ParseIntPipe } from '@nestjs/common';
import { Person } from '../entities/person.entity';
import { PersonService } from './person.service';
import { ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { CreatePersonDto } from '../entities/createPerson.dto';

@ApiTags('person')
@Controller('person')
export class PersonController {
    @Inject(PersonService)
    private readonly service: PersonService;

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Create new person' })
    @ApiCreatedResponse({ description: 'Person has been successfully created.', type: () => Person })
    @ApiResponse({ status: 500, description: 'Error creating user' })
    @ApiResponse({ status: 400, description: 'Bad Request, some fileds are missing' })
    @ApiBody({ description: 'Person to insert', type: CreatePersonDto })
    public async createUser(@Body() body: CreatePersonDto): Promise<Person> {
        return await this.service.createUser(body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a person by ID' })
    @ApiResponse({ status: 200, description: 'The person has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Person not found.' })
    @ApiResponse({ status: 400, description: 'Id is in wrong format.' })
    @ApiParam({ name: 'id', example: 1, type: Number, description: 'Person ID' })
    public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.removeUser(id);
    }
}
