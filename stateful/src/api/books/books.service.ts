import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../entities/createBook.dto';
import { Books } from '../entities/books.entitity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';

@Injectable()
export class BooksService {
    @InjectRepository(Books)
    private readonly repository: Repository<Books>;

    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>;



    async getAllBooks(): Promise<Books[]> {
        const books = await this.repository.find();

        for (const book of books) {
                const user = await this.personRepository.findOne({ where: { id: book.user_id } });
                console.log(user);
                if (!user) {
                    throw new InternalServerErrorException(`User with id ${book.user_id} for book with id ${book.id} does not exist, causing a stateful error`);
                }
        }

        return books;
    }

    async createBook(createBookDTO: CreateBookDto): Promise<Books> {
        const user = await this.personRepository.findOne({ where: { id: createBookDTO.person.id } });

        if (!user) {
            throw new NotFoundException(`User with id ${createBookDTO.person.id} not found`);
        }

        const book = this.repository.create(createBookDTO);
        return this.repository.save(book);
    }
}
