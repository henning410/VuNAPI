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
exports.PersonsController = void 0;
const persons_service_1 = require("./persons.service");
const common_1 = require("@nestjs/common");
const person_entity_1 = require("../entities/person.entity");
const swagger_1 = require("@nestjs/swagger");
let PersonsController = class PersonsController {
    getAllUser() {
        return this.service.getAllUsers();
    }
    async getUser(id) {
        const user = await this.service.getUser(id);
        if (!user) {
            throw new common_1.NotFoundException('Person not found');
        }
        else {
            return user;
        }
    }
};
__decorate([
    (0, common_1.Inject)(persons_service_1.PersonsService),
    __metadata("design:type", persons_service_1.PersonsService)
], PersonsController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all persons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all persons', type: [person_entity_1.Person] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonsController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, swagger_1.ApiOperation)({ summary: 'Get person by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the person with the specific ID', type: person_entity_1.Person }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Person not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Id is in wrong format.' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, type: Number, description: 'ID of the person' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonsController.prototype, "getUser", null);
PersonsController = __decorate([
    (0, swagger_1.ApiTags)('persons'),
    (0, common_1.Controller)('persons')
], PersonsController);
exports.PersonsController = PersonsController;
//# sourceMappingURL=persons.controller.js.map