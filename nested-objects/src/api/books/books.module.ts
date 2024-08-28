import { Module } from '@nestjs/common';
import { Book } from '../entities/book.entitity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from '../person/person.module';
import { Person } from '../entities/person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book, Person]), PersonModule],
    controllers: [BooksController],
    providers: [BooksService]
  })
  export class BooksModule {}
