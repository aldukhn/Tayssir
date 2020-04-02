import { Twilio } from 'twilio';

import { Injectable, HttpStatus } from '@nestjs/common';
import { properties } from '../../../apps/api/properties';
import { Response } from './lib/Response';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export class MessageService {


    async sendSms(phoneNumber: string, messageBody: string): Promise<Response> {

        const response: Response = {} as Response;
        const client = new Twilio(properties.accountSid, properties.authToken);

        if (!this.validE164(phoneNumber)) {
            throw new Error('number must be E164 format!')
        }

        const textContent: MessageListInstanceCreateOptions = {
            body: messageBody,
            to: phoneNumber,
            from: properties.twilioNumber
        }
        try {
            const message = await client.messages.create(textContent);
            response.status = message.status;
            response.message = "! تم ارسال الرسالة بنجاح";
            response.code = HttpStatus.OK;
        } catch (error) {
            response.status = "failed";
            response.code = HttpStatus.INTERNAL_SERVER_ERROR;
            response.message = 'تعدر إرسال الرسالة';
            throw new Error(error.message);
        }
        return response;
    }

    // Validate E164 format
    validE164(num) {
        return /^\+?[1-9]\d{1,14}$/.test(num)
    }
}