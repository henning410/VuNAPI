import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonsService {
    @InjectRepository(Person)
    private readonly repository: Repository<Person>;

    async getAllUsers(): Promise<Person[]> {
        return this.repository.find();
    }

    async getUser(id: number): Promise<Person> {
        return await this.repository.findOne(id);
    }
}
