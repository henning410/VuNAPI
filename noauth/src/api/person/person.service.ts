import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../entities/createPerson.dto';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonService {
    @InjectRepository(Person)
    private readonly repository: Repository<Person>;

    async createUser(createPersonDTO: CreatePersonDto): Promise<Person> {
        try {
            const person = this.repository.create(createPersonDTO)
            return this.repository.save(person);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            throw error;
        }
        
    }

    async getUser(id: number): Promise<Person> {
        return await this.repository.findOne(id);
    }

    async removeUser(id: number): Promise<void> {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        console.log("Delete user: ", id);
        await this.repository.delete(id);
    }

    async saveUser(person: Person): Promise<Person> {
        return await this.repository.save(person);
    }
}
