import { Controller, Get, Head, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiBasicAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Head("isAlive")
  @ApiOperation({ summary: "Check if app is alive" })
  @ApiResponse({ status: 200, description: "App is alive" })
  checkServerStatus(): void {}

  @Get("testStatusCodes")
  @UseGuards(AuthGuard("basic"))
  @ApiBasicAuth("basic")
  @ApiOperation({ summary: "Check if fuzzer recognizes wrong status codes" })
  @ApiResponse({ status: 200, description: "200 is returned" })
  @ApiResponse({ status: 400, description: "400 is returned" })
  @ApiUnauthorizedResponse({ description: "Wrong login credentials" })
  testStatusCodes(): string {
    throw new HttpException("Ups!", HttpStatus.FORBIDDEN);
  }
}
