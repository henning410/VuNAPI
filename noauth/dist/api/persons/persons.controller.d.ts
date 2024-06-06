import { Person } from '../entities/person.entity';
export declare class PersonsController {
    private readonly service;
    getAllUser(): Promise<Person[]>;
    getUser(id: number): Promise<Person>;
}
