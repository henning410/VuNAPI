import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PersonModule, BooksModule]
})
export class ApiModule {}
