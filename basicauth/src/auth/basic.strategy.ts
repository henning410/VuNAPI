import { BasicStrategy as Strategy } from "passport-http";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if ("user1" === username && "1234" === password) {
      return true;
    }
    throw new UnauthorizedException();
  };
}
