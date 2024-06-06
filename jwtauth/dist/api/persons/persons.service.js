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
exports.PersonsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const person_entity_1 = require("../entities/person.entity");
let PersonsService = class PersonsService {
    async getAllUsers() {
        return this.repository.find();
    }
    async getUser(id) {
        return await this.repository.findOne(id);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(person_entity_1.Person),
    __metadata("design:type", typeorm_2.Repository)
], PersonsService.prototype, "repository", void 0);
PersonsService = __decorate([
    (0, common_1.Injectable)()
], PersonsService);
exports.PersonsService = PersonsService;
//# sourceMappingURL=persons.service.js.map