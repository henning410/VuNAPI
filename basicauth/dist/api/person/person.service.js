"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const person_entity_1 = require("../entities/person.entity");
let PersonService = class PersonService {
    async createUser(createPersonDTO) {
        try {
            const person = this.repository.create(createPersonDTO);
            return this.repository.save(person);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            throw error;
        }
    }
    async getUser(id) {
        return await this.repository.findOne(id);
    }
    async removeUser(id) {
        const user = await this.repository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        console.log("Delete user: ", id);
        await this.repository.delete(id);
    }
    async saveUser(person) {
        return await this.repository.save(person);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(person_entity_1.Person),
    __metadata("design:type", typeorm_2.Repository)
], PersonService.prototype, "repository", void 0);
PersonService = __decorate([
    (0, common_1.Injectable)()
], PersonService);
exports.PersonService = PersonService;
//# sourceMappingURL=person.service.js.map