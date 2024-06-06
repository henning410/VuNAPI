import { Type, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ServerOptions } from "https";
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  let base_url = "http://localhost:3000/"
  let app: NestExpressApplication;

  if (process.env.USE_HTTP2 === "true") {
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: fs.readFileSync('./certs/server.key'),
        cert: fs.readFileSync('./certs/server.cert')
      },
    });
    base_url = "https://localhost:3000/"
  } else {
    app = await NestFactory.create(AppModule);
  }

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");

  const swaggerConfig = new DocumentBuilder()
    .setTitle("VuNAPI - Basic Auth")
    .setDescription("OpenAPI v3 specs for VuNAPI")
    .setVersion("1.0")
    .addServer(base_url, "Local environment")
    .addTag("default")
    .addTag("person")
    .addTag("persons")
    .addTag("login")
    .addBasicAuth(
      {
        type: "http",
        scheme: "basic",
        description: "Enter the credentials",
      },
      "basic"
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port, () => {
    console.log("[WEB]", base_url);
  });
}

bootstrap();
