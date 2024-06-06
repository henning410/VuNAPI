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
    @ApiCreatedResponse({ description: 'Person has been successfully created.' })
    @ApiResponse({ status: 500, description: 'Error creating user' })
    @ApiResponse({ status: 400, description: 'Bad Request, some fileds are missing' })
    @ApiResponse({ status: 403, description: 'Username already exists' })
    @ApiBody({ description: 'Person to insert', type: CreatePersonDto })
    public async createUser(@Body() body: CreatePersonDto): Promise<Person> {
        try {
            return await this.service.createUser(body);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException('Username already exists');
            }
            throw new HttpException('Username already exists', HttpStatus.FORBIDDEN);
        }
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({ summary: 'Update a person' })
    @ApiFoundResponse({ description: 'Return the updated person', type: Person })
    @ApiResponse({ status: 404, description: 'Person not found' })
    @ApiResponse({ status: 400, description: 'Id is in wrong format.' })
    @ApiBody({ description: 'Person to update', schema: { example: { username: 'NewUserName' } } })
    @ApiParam({ name: 'id', description: 'ID of the person', example: 1, type: Number })
    public async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Person>): Promise<Person> {
        const user = await this.service.getUser(id)

        if (!user) {
            throw new NotFoundException('Person not found');
        }

        Object.assign(user, updateData);

        return await this.service.saveUser(user);
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiOperation({ summary: 'Delete a person by ID' })
    @ApiResponse({ status: 200, description: 'The person has been successfully deleted' })
    @ApiResponse({ status: 404, description: 'Person not found.' })
    @ApiResponse({ status: 400, description: 'Id is in wrong format.' })
    @ApiParam({ name: 'id', example: 1, type: Number, description: 'Person ID' })
    public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.removeUser(id);
    }
}
