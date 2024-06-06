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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonController = void 0;
const common_1 = require("@nestjs/common");
const person_entity_1 = require("../entities/person.entity");
const person_service_1 = require("./person.service");
const swagger_1 = require("@nestjs/swagger");
const createPerson_dto_1 = require("../entities/createPerson.dto");
let PersonController = class PersonController {
    async createUser(body) {
        try {
            return await this.service.createUser(body);
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException('Username already exists');
            }
            throw new common_1.HttpException('Username already exists', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async updateUser(id, updateData) {
        const user = await this.service.getUser(id);
        if (!user) {
            throw new common_1.NotFoundException('Person not found');
        }
        Object.assign(user, updateData);
        return await this.service.saveUser(user);
    }
    remove(id) {
        return this.service.removeUser(id);
    }
};
__decorate([
    (0, common_1.Inject)(person_service_1.PersonService),
    __metadata("design:type", person_service_1.PersonService)
], PersonController.prototype, "service", void 0);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Create new person' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Person has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Error creating user' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request, some fileds are missing' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Username already exists' }),
    (0, swagger_1.ApiBody)({ description: 'Person to insert', type: createPerson_dto_1.CreatePersonDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPerson_dto_1.CreatePersonDto]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "createUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Update a person' }),
    (0, swagger_1.ApiFoundResponse)({ description: 'Return the updated person', type: person_entity_1.Person }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Person not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Id is in wrong format.' }),
    (0, swagger_1.ApiBody)({ description: 'Person to update', schema: { example: { username: 'NewUserName' } } }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the person', example: 1, type: Number }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a person by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The person has been successfully deleted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Person not found.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Id is in wrong format.' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, type: Number, description: 'Person ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonController.prototype, "remove", null);
PersonController = __decorate([
    (0, swagger_1.ApiTags)('person'),
    (0, common_1.Controller)('person')
], PersonController);
exports.PersonController = PersonController;
//# sourceMappingURL=person.controller.js.map