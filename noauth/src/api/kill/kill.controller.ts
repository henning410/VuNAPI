import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("kill")
export class KillController {
  @Get()
  @ApiOperation({ summary: "Calling this endpoints will shut down the server" })
  @ApiResponse({ status: 200, description: "200 is returned" })
  @ApiResponse({ status: 400, description: "400 is returned" })
  kill(): string {
    process.exit();
  }
}
