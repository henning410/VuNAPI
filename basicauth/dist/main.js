"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get('PORT');
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Vulnerable ToDo app')
        .setDescription('This API is vulnerable to SQL injection')
        .setVersion('1.0')
        .addServer('https://localhost:3000/', 'Local environment')
        .addTag('person')
        .addTag('persons')
        .addTag('login')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    await app.listen(port, () => {
        console.log('[WEB]', config.get('BASE_URL'));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map