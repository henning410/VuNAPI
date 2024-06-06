"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const person_module_1 = require("./person/person.module");
const login_module_1 = require("./login/login.module");
const persons_module_1 = require("./persons/persons.module");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [person_module_1.PersonModule, login_module_1.LoginModule, persons_module_1.PersonsModule]
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map