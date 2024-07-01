import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Person } from './person.entity';

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID of the book' })
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Harry Potter Band 1', description: 'Title of the book' })
    public book_title: string;

    @Column({ nullable: true })
    @ApiProperty({ example: '1', description: 'User id who owns the book' })
    public user_id: number | null;

    @ManyToOne(() => Person, person => person.books, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    @ApiProperty({ type: () => Person, description: 'Person who owns the book' })
    person: Person;
}