import { Injectable, HttpStatus } from '@nestjs/common';
import { MessageService, Request } from '@tayssir/api-interfaces';
import { Response } from 'libs/api-interfaces/src/lib/Response';
import { properties } from 'apps/api/properties';
import { Otp } from '../entity/otp/otp.entity';
import { OtpsService } from '../entity/otp/otps.service';

@Injectable()
export class RequestorService {

    constructor(private readonly messageService: MessageService, private readonly otpService: OtpsService) { }

    async addRequest(request: Request): Promise<Response> {
        let response: Response = {} as Response;
        const currentTimeMillis = Date.now();
        const storedOtp = await this.otpService.getOtpByPhoneNumer(request.phone);
        if (request.verificationCode === storedOtp.verificationCode) {
            //TODO : save request into database

            response.code = HttpStatus.OK;
            response.message = 'تم حفظ بياناتك بنجاح';
        } else {
            response.status = 'failed';
            response.message = 'يرجى إدخال رمز صالح';
            response.code = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return response;
    }

    async generateOTP(phoneNumber: string): Promise<Response> {
        const generatedCode = this.generatePIN();
        const otp = this.constructOtpObject(phoneNumber, generatedCode);
        await this.otpService.save(otp);
        return this.messageService.sendSms(phoneNumber, properties.messageBody + generatedCode);
    }

    constructOtpObject(phoneNumber: string, generatedCode: number) {
        const otp = new Otp();
        otp.createdAt = new Date();
        otp.updatedAt = new Date();
        //otp expire dans 15 minutes
        const nowDate = new Date();
        otp.expirationTime = nowDate.getTime() / 1000 + 900;
        otp.phone = phoneNumber;
        otp.verificationCode = generatedCode;
        return otp
    }
    generatePIN(): number {
        return Math.floor(100000 + Math.random() * 900000);
    }
}