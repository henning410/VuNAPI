import { Type, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestApplication, NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Server, ServerOptions } from "https";
import * as fs from 'fs';
import * as https from 'https';
import * as spdy from "spdy"
import * as express from "express";

async function bootstrap() {

  if (process.env.DISABLE_HTTP2 === "false") {
    const expressApp = express();
    const spdyOpts: ServerOptions = {
      key: fs.readFileSync('./certs/server.key'),
      cert: fs.readFileSync('./certs/server.cert')
    };
    const server: Server = spdy.createServer(spdyOpts, expressApp);
    const app: NestApplication = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    configureSwagger("https://localhost:3000/", app);

    await app.init();
    await server.listen(3000, () => {
      printInfo("https://localhost:3000/");
    });
  } else if (process.env.DISABLE_HTTPS === "false") {
    const app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: fs.readFileSync('./certs/server.key'),
        cert: fs.readFileSync('./certs/server.cert')
      },
    });
    await configureAppAndListen(app, "https://localhost:3000/")
  } else {
    const app = await NestFactory.create(AppModule);
    await configureAppAndListen(app, "http://localhost:3000/")
  }
}

async function configureAppAndListen(app, url) {
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>("PORT");
  configureSwagger(url, app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  await app.listen(port, () => {
    printInfo(url)
  });
}

function configureSwagger(base_url, app) {
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
}

function printInfo(base_url) {
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

  const http2Color = process.env.DISABLE_HTTP2 === 'false' ? '\x1b[32m' : '\x1b[31m';
  const http2Status = process.env.DISABLE_HTTP2 === 'false' ? 'enabled' : 'disabled';
  console.log(`\x1b[35m - HTTP2 ${http2Color}${http2Status}\x1b[0m`);

  const httpsColor = (process.env.DISABLE_HTTP2 === 'false' || process.env.DISABLE_HTTPS === 'false') ? '\x1b[32m' : '\x1b[31m';
  const httpsStatus = (process.env.DISABLE_HTTP2 === 'false' || process.env.DISABLE_HTTPS === 'false') ? 'enabled' : 'disabled';
  console.log(`\x1b[35m - HTTPS ${httpsColor}${httpsStatus}\x1b[0m`);
}

bootstrap();
