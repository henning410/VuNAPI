import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';

@Module({
  imports: [PersonModule]
})
export class ApiModule { }
