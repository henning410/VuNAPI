import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../entities/person.entity";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "6000s" },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
