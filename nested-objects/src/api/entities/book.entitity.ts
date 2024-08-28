import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Person } from './person.entity';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID of the book' })
    public id!: number;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Harry Potter Band 1', description: 'Title of the book' })
    public title: string;

    @ManyToOne(() => Person, person => person.books, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'person_id' })
    @ApiProperty({ type: () => Person, description: 'Person who owns the book' })
    person: Person;
}