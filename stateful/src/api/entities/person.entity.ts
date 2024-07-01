import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Books } from './books.entitity';

@Entity()
@Unique(['username'])
export class Person {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID of the user' })
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'henning', description: 'Username of the user' })
    public username: string;

    @Column({ type: 'varchar', length: 120 })
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@test.de', description: 'Email of the user' })
    public email: string;

    @Column({ type: 'varchar', length: 120 })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '1234', description: 'Password of the user' })
    public password: string;

    @OneToMany(() => Books, book => book.person)
    @ApiProperty({ type: () => Books, isArray: true, description: 'All books of one person' })
    books: Books[];
}