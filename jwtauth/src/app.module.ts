import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getEnvPath } from "./common/helper/env.helper";
import { TypeOrmConfigService } from "./shared/typeorm/typeorm.service";
import { ApiModule } from "./api/api.module";
import { KillController } from "./api/kill/kill.controller";

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ...(process.env.DISABLE_RATE_LIMITING === "true"
      ? []
      : [
          ThrottlerModule.forRoot([
            {
              name: "short",
              ttl: 1000,
              limit: 1,
            },
            {
              name: "medium",
              ttl: 10000,
              limit: 8,
            },
            {
              name: "long",
              ttl: 60000,
              limit: 50,
            },
          ]),
        ]),
    ApiModule,
  ],
  controllers: [AppController, ...(process.env.DISABLE_KILL_ENDPOINT === "true" ? [] : [KillController])],
  providers: [
    AppService,
    ...(process.env.DISABLE_RATE_LIMITING === "true"
      ? []
      : [
          {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
          },
        ]),
  ],
})
export class AppModule {}
