import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiBasicAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller("kill")
export class KillController {
  @Get()
  @UseGuards(AuthGuard("basic"))
  @ApiBasicAuth("basic")
  @ApiOperation({ summary: "Calling this endpoints will shut down the server" })
  @ApiResponse({ status: 200, description: "200 is returned" })
  @ApiResponse({ status: 400, description: "400 is returned" })
  @ApiUnauthorizedResponse({ description: "Wrong login credentials" })
  kill(): string {
    process.exit();
  }
}
