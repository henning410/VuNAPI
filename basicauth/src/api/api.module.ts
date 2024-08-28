import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { LoginModule } from './login/login.module';
import { PersonsModule } from './persons/persons.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [PersonModule, LoginModule, PersonsModule, ...(process.env.DISABLE_LOGICAL_ORDER_ERROR === "true" ? [] : [ResourceModule])]
})
export class ApiModule {}
