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
exports.LoginController = void 0;
const swagger_1 = require("@nestjs/swagger");
const login_service_1 = require("./login.service");
const person_entity_1 = require("../entities/person.entity");
const common_1 = require("@nestjs/common");
const swagger_2 = require("@nestjs/swagger");
let LoginController = class LoginController {
    async login(username, password) {
        try {
            return this.service.login(username, password);
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.HttpException('Login credentials wrong', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
    }
};
__decorate([
    (0, common_1.Inject)(login_service_1.LoginService),
    __metadata("design:type", login_service_1.LoginService)
], LoginController.prototype, "service", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_2.ApiOperation)({ summary: 'Login user with username and password' }),
    (0, swagger_2.ApiResponse)({ status: 200, description: 'Login successfull', type: person_entity_1.Person }),
    (0, swagger_2.ApiResponse)({ status: 401, description: 'Login credentials wrong' }),
    (0, swagger_2.ApiQuery)({ name: 'username', description: 'Username of person', example: 'john_doe' }),
    (0, swagger_2.ApiQuery)({ name: 'password', description: 'Password of person', example: 'password1234' }),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login", null);
LoginController = __decorate([
    (0, swagger_1.ApiTags)('login'),
    (0, common_1.Controller)('login')
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map