import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { LoginModule } from './login/login.module';
import { PersonsModule } from './persons/persons.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PersonModule, LoginModule, PersonsModule, BooksModule]
})
export class ApiModule {}
