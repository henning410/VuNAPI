import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../entities/createBook.dto';
import { Book } from '../entities/book.entitity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { create } from 'domain';

@Injectable()
export class BooksService {
    @InjectRepository(Book)
    private readonly repository: Repository<Book>;

    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>;

    async getAllBooks(): Promise<Book[]> {
        const books = await this.repository.find({ relations: ['person'] });
        for (const book of books) {
            if(book.person == null) {
                console.log("Triggered statful error");
                throw new InternalServerErrorException(`Person for book with id ${book.id} does not exist, causing a stateful error`);
            }
        }
        return books;
    }

    async createBook(createBookDTO: CreateBookDto): Promise<Book> {
        const user = await this.personRepository.findOne({ where: { id: createBookDTO.person_id } });
        if (!user) {
            throw new BadRequestException(`Person with id ${createBookDTO.person_id} not found`);
        }
        const book = this.repository.create(createBookDTO);
        book.person = user;
        return this.repository.save(book);
    }
}
