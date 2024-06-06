import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { exec } from 'child_process';
import { LoginGuard } from "../login/login.guard";

@Controller('exec')
export class CmdinjectController {
    @Get()
    @UseGuards(LoginGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Executing cmd commands" })
    @ApiResponse({ status: 200, description: "200 is returned" })
    @ApiResponse({ status: 400, description: "400 is returned" })
    execCommand(@Query('cmd') cmd: string): Promise<string> {
        return new Promise((resolve, reject) => {
            exec(cmd, (error, stdout, stderr) => {
              if (error) {
                reject(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                reject(`Stderr: ${stderr}`);
                return;
              }
              resolve(stdout);
            });
          });
    }

}
