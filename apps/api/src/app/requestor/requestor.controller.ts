import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RequestorService } from './requestor.service';
import { Response } from 'libs/api-interfaces/src/lib/Response';
import { Request } from 'libs/api-interfaces/src/lib/Request';
import { throws } from 'assert';

@Controller('/requestor')
export class RequestorController {

    constructor(private readonly requestorService: RequestorService) { }

    @Post('generateOtp')
    generateOtp(@Body() contact: { phoneNumber: string }): Promise<Response> {
        if (contact && contact.phoneNumber != null) {
            return this.requestorService.generateOTP(contact.phoneNumber);
        } else {
            throw new HttpException('يرجى إدخال رقم هاتف', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Post('save')
    validateOtpAndSaveRequest(@Body() request: Request): Promise<Response> {
        return this.requestorService.addRequest(request);
    }
}