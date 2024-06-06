import { UseGuards, Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginGuard } from '../login/login.guard';

@Controller('redos')
export class RedosController {
    @Get()
    @UseGuards(LoginGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Calling this endpoint can causes RegexDoS" })
    @ApiResponse({ status: 200, description: "200 is returned" })
    @ApiResponse({ status: 400, description: "400 is returned" })
    @ApiUnauthorizedResponse({ description: "Wrong login credentials" })
    checkReDoS(@Query('email') email: string): string {
        const regex = /^^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@{1}([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (regex.test(email)) {
        return 'Valid email';
        } else {
            return 'Invalid email';
        }
    }
}