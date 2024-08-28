import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Book } from './book.entitity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID of the user' })
    public id!: number;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'henning', description: 'Username of the user' })
    public username: string;

    @OneToMany(() => Book, book => book.person)
    //@ApiProperty({ type: () => Books, isArray: true, description: 'All books of one person', required: false })
    books: Book[];
}