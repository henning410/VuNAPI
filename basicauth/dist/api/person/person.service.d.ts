import { CreatePersonDto } from '../entities/createPerson.dto';
import { Person } from '../entities/person.entity';
export declare class PersonService {
    private readonly repository;
    createUser(createPersonDTO: CreatePersonDto): Promise<Person>;
    getUser(id: number): Promise<Person>;
    removeUser(id: number): Promise<void>;
    saveUser(person: Person): Promise<Person>;
}
