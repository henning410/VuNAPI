import { Person } from '../entities/person.entity';
import { CreatePersonDto } from '../entities/createPerson.dto';
export declare class PersonController {
    private readonly service;
    createUser(body: CreatePersonDto): Promise<Person>;
    updateUser(id: number, updateData: Partial<Person>): Promise<Person>;
    remove(id: number): Promise<void>;
}
