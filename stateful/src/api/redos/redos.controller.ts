import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('redos')
export class RedosController {
    @Get()
    @ApiOperation({ summary: "Calling this endpoint with long email causes RegexDoS" })
    @ApiResponse({ status: 200, description: "200 is returned" })
    @ApiResponse({ status: 400, description: "400 is returned" })
    checkReDoS(@Query('email') email: string): string {
        console.log("Redos path called")
        email = "this_is_some_very_very_long_malformed_string"
        const regex = /^^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@{1}([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (regex.test(email)) {   
            return 'Valid email';
        } else {
            return 'Invalid email';
        }
    }
}
