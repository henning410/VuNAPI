import { Person } from '../entities/person.entity';
export declare class PersonsService {
    private readonly repository;
    getAllUsers(): Promise<Person[]>;
    getUser(id: number): Promise<Person>;
}
