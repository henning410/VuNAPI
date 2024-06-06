import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginGuard } from "../login/login.guard";

@Controller("kill")
export class KillController {
  @Get()
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Calling this endpoints will shut down the server" })
  @ApiResponse({ status: 200, description: "200 is returned" })
  @ApiResponse({ status: 400, description: "400 is returned" })
  @ApiUnauthorizedResponse({ description: "Wrong login credentials" })
  kill(): string {
    process.exit();
  }
}
