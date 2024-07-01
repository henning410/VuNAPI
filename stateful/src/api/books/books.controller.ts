import { UseGuards, Controller, Get, Inject, Param, NotFoundException, UsePipes, ValidationPipe, ParseIntPipe, Post, Body, ConflictException } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiCreatedResponse, ApiBody } from "@nestjs/swagger";
import { BooksService } from "./books.service";
import { Books } from "../entities/books.entitity";
import { CreateBookDto } from "../entities/createBook.dto";

@ApiTags("books")
@Controller("books")
export class BooksController {
    @Inject(BooksService)
    private readonly service: BooksService;

    @Get()
    @ApiOperation({ summary: "Get all books" })
    @ApiResponse({ status: 200, description: "Return all books", type: [Books] })
    public getAllBooks(): Promise<Books[]> {
        return this.service.getAllBooks();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @ApiOperation({ summary: 'Create new book' })
    @ApiCreatedResponse({ description: 'Book has been successfully created.' })
    @ApiResponse({ status: 500, description: 'Error creating book' })
    @ApiResponse({ status: 400, description: 'Bad Request, some fileds are missing' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiBody({ description: 'Book to insert', type: CreateBookDto })
    public async createBook(@Body() body: CreateBookDto): Promise<Books> {
        return await this.service.createBook(body);
    }
}
