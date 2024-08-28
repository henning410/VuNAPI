import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UsePipes, ValidationPipe, Param, NotFoundException, HttpException, HttpStatus, ConflictException, ParseIntPipe, Res } from '@nestjs/common';
import { Resource } from '../entities/resource.entity';
import { ResourceService } from './resource.service';
import { ApiBody, ApiCreatedResponse, ApiFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, PartialType } from '@nestjs/swagger';
import { CreateResourceDto } from '../entities/createResource.dto';

@ApiTags('resource')
@Controller('resource')
export class ResourceController {
    @Inject(ResourceService)
    private readonly service: ResourceService;

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Create new resource' })
    @ApiCreatedResponse({ description: 'Resource has been successfully created.', type: Resource })
    @ApiResponse({ status: 400, description: 'Bad Request, some fileds are missing' })
    @ApiBody({ description: 'Resource to insert', type: CreateResourceDto })
    public async createResource(@Body() body: CreateResourceDto): Promise<Resource> {
        return await this.service.create(body);
    }

    @Put(':id/unlock')
    @ApiOperation({ summary: 'Unlock a resource by ID' })
    @ApiResponse({ status: 200, description: 'Resource successfully locked', type: Resource })
    @ApiResponse({ status: 404, description: 'Resource not found.' })
    @ApiResponse({ status: 400, description: 'ID is in wrong format.' })
    @ApiParam({ name: 'id', example: 1, type: Number, description: 'Resource ID' })
    public unlockResource(@Param('id', ParseIntPipe) id: number): Promise<Resource> {
        return this.service.unlockResource(id);
    }

    @Put(':id/lock')
    @ApiOperation({ summary: 'Lock a resource by ID' })
    @ApiResponse({ status: 200, description: 'Resource successfully locked', type: Resource })
    @ApiResponse({ status: 404, description: 'Resource not found.' })
    @ApiResponse({ status: 400, description: 'ID is in wrong format.' })
    @ApiParam({ name: 'id', example: 1, type: Number, description: 'Resource ID' })
    public lockResource(@Param('id', ParseIntPipe) id: number): Promise<Resource> {
        return this.service.lockResource(id);
    }

}
