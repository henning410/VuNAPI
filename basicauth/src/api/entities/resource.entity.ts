import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class Resource {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID of the user' })
    public id!: number;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'TestResource', description: 'Name of the resource' })
    public name: string;

    @Column({ type: 'boolean', default: false })
    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false, description: 'True if the resource is locked, otherwise false' })
    public isLocked: boolean;
}