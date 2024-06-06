import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { LoginModule } from './login/login.module';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [PersonModule, LoginModule, PersonsModule]
})
export class ApiModule {}
