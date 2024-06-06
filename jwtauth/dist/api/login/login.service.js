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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const person_entity_1 = require("../entities/person.entity");
const typeorm_2 = require("typeorm");
let LoginService = class LoginService {
    async login(username, password) {
        let sql = 'SELECT * FROM person';
        if (username && password) {
            sql += ' WHERE username =' + "'" + username + "'" + ' AND password =' + "'" + password + "'";
        }
        console.log(sql);
        const result = await this.repository.query(sql);
        if (Array.isArray(result) && result.length === 1) {
            return result[0];
        }
        else if (result.length === 0) {
            throw new common_1.UnauthorizedException('Login credentials wrong');
        }
        else {
            return result;
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(person_entity_1.Person),
    __metadata("design:type", typeorm_2.Repository)
], LoginService.prototype, "repository", void 0);
LoginService = __decorate([
    (0, common_1.Injectable)()
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map