import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from '../entities/createResource.dto';
import { Resource } from '../entities/resource.entity';

@Injectable()
export class ResourceService {
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>;

    async create(createResourceDto: CreateResourceDto): Promise<Resource> {
        const resource = this.repository.create(createResourceDto);
        const resp = await this.repository.save(resource);
        console.log('Create Resource ', resp.id);
        return resp;
    }

    async lockResource(id: number): Promise<Resource> {
        console.log('Lock Resource ', id);
        const resource = await this.repository.findOne(id);
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        if (resource.isLocked) {
            console.log(`\x1b[31m Stateful error triggered: ${id} \x1b[0m`);
            throw new InternalServerErrorException('Resource is already locked');
        }
        resource.isLocked = true;
        return this.repository.save(resource);
    }

    async unlockResource(id: number): Promise<Resource> {
        console.log('Unlock Resource ', id);
        const resource = await this.repository.findOne(id);
        if (!resource) {
            throw new NotFoundException('Resource not found');
        }
        resource.isLocked = false;
        return this.repository.save(resource);
    }
}
