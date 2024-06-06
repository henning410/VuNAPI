import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "../entities/person.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginService {
  @InjectRepository(Person)
  private readonly repository: Repository<Person>;

  constructor(private jwtService: JwtService) {}

  async login(username: any, password: any) {
    //const sql = 'SELECT * FROM person WHERE username =' + "'" + username + "'" + ' AND password =' + "'" + password + "'";

    let sql = "SELECT * FROM person";

    // Check if username and password are provided
    if (username && password) {
      sql += " WHERE username =" + "'" + username + "'" + " AND password =" + "'" + password + "'";
    }

    console.log(sql);
    const result = await this.repository.query(sql);

    // If the result is an array and it has only one element
    if (Array.isArray(result) && result.length === 1) {
      // Return the first (and only) element
      // return result[0];
      const payload = { sub: result[0].id, username: result[0].username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else if (result.length === 0) {
      throw new UnauthorizedException("Login credentials wrong");
    } else {
      // Return the entire result array
      return result;
    }
  }
}
