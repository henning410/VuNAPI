import { Type, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ServerOptions } from "https";

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("VuNAPI")
    .setDescription("OpenAPI v3 specs for VuNAPI")
    .setVersion("1.0")
    .addServer("http://localhost:3000/", "Local environment")
    .addTag("default")
    .addTag("person")
    .addTag("persons")
    .addTag("login")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port, () => {
    console.log("[WEB]", config.get<string>("BASE_URL"));
  });
}

bootstrap();
