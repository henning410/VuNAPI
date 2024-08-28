import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

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

    @Column({ default: false, type: 'boolean' })
    @IsBoolean()
    @ApiProperty({ example: false, description: 'Person is deleted or not' })
    deleted: boolean
}