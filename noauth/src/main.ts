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

  if (process.env.DISABLE_HTTP2 === "false") {
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
    .setTitle("VuNAPI - No Auth")
    .setDescription("OpenAPI v3 specs for VuNAPI")
    .setVersion("1.0")
    .addServer(base_url, "Local environment")
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
    console.log(" __      __    _   _          _____ _____ ")
    console.log(" \\ \\    / /   | \\ | |   /\\   |  __ \\_   _|")
    console.log("  \\ \\  / /   _|  \\| |  /  \\  | |__) || |  ")
    console.log("   \\ \\/ / | | | . ` | / /\\ \\ |  ___/ | |  ")
    console.log("    \\  /| |_| | |\\  |/ ____ \\| |    _| |_ ")
    console.log("     \\/  \\__,_|_| \\_/_/    \\_\\_|   |_____|")
    console.log("                                          ")

    console.log(`\x1b[33mVuNAPI is running on: ${base_url} \x1b[0m`);
    console.log(`\x1b[33mRunning without authentication \x1b[0m`);
    console.log(`\x1b[35mConfiguration Options: \x1b[0m`);
    
    const killEndpointColor = process.env.DISABLE_KILL_ENDPOINT === 'false' ? '\x1b[32m' : '\x1b[31m'; // Green for 'true', Red for anything else
    const killEndpointStatus = process.env.DISABLE_KILL_ENDPOINT === 'false' ? 'enabled' : 'disabled';
    console.log(`\x1b[35m - Kill endpoint ${killEndpointColor}${killEndpointStatus}\x1b[0m`);

    const rateLimitingColor = process.env.DISABLE_RATE_LIMITING === 'false' ? '\x1b[32m' : '\x1b[31m';
    const rateLimitingStatus = process.env.DISABLE_RATE_LIMITING === 'false' ? 'enabled' : 'disabled';
    console.log(`\x1b[35m - Rate Limiting ${rateLimitingColor}${rateLimitingStatus}\x1b[0m`);

    const redosColor = process.env.DISABLE_REDOS === 'false' ? '\x1b[32m' : '\x1b[31m';
    const redosStatus = process.env.DISABLE_REDOS === 'false' ? 'enabled' : 'disabled';
    console.log(`\x1b[35m - RegexDoS ${redosColor}${redosStatus}\x1b[0m`);

    const cmdInjectionColor = process.env.DISABLE_CMD_INJECTION === 'false' ? '\x1b[32m' : '\x1b[31m';
    const cmdInjectionStatus = process.env.DISABLE_CMD_INJECTION === 'false' ? 'enabled' : 'disabled';
    console.log(`\x1b[35m - OS command injection ${cmdInjectionColor}${cmdInjectionStatus}\x1b[0m`);

    const http2Color = process.env.DISABLE_HTTP2=== 'false' ? '\x1b[32m' : '\x1b[31m';
    const http2Status = process.env.DISABLE_HTTP2 === 'false' ? 'enabled' : 'disabled';
    console.log(`\x1b[35m - HTTP2 ${http2Color}${http2Status}\x1b[0m`);
  });
}

bootstrap();
