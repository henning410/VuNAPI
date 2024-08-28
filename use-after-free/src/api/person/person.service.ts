import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from '../entities/createPerson.dto';
import { Person } from '../entities/person.entity';

@Injectable()
export class PersonService {
    @InjectRepository(Person)
    private readonly repository: Repository<Person>;

    async create(createPersonDto: CreatePersonDto): Promise<Person> {
        const person = this.repository.create(createPersonDto);
        return this.repository.save(person);
    }

    async findOne(id: number): Promise<Person> {
        const person = await this.repository.findOne(id);
        console.log('Find person: ', id)
        if (!person) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }
        if (person.deleted) {
            console.log('Stateful error triggered')
            throw new InternalServerErrorException(`Person with ID ${id} has been deleted`);
        }
        return person;
    }

    async remove(id: number): Promise<void> {
        console.log('Remove person: ', id)
        const person = await this.repository.findOne(id);
        if (!person) {
            throw new NotFoundException(`Person with ID ${id} not found`);
        }
        if (person.deleted) {
            throw new NotFoundException(`Person with ID ${id} has already been deleted`);
        }
        person.deleted = true;
        await this.repository.save(person);
    }

    async getAll(): Promise<Person[]> {
        return this.repository.find({where: {deleted: false}});
    }
}
