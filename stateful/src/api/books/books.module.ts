import { Module } from '@nestjs/common';
import { Books } from '../entities/books.entitity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsModule } from '../persons/persons.module';
import { PersonModule } from '../person/person.module';
import { Person } from '../entities/person.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Books, Person]), PersonModule],
    controllers: [BooksController],
    providers: [BooksService]
  })
  export class BooksModule {}
