import { Injectable, HttpStatus } from '@nestjs/common';
import { MessageService, RequestFormObject, RequestStatus } from '@tayssir/api-interfaces';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { Response } from 'libs/api-interfaces/src/lib/Response';
// tslint:disable-next-line:nx-enforce-module-boundaries
import { properties } from 'apps/api/properties';
import { OtpsService } from '../entity/otp/otps.service';
import { RequestsService } from '../entity/request/requests.service';
import { Request } from '../entity/request/request.entity';
import { base64ToImage } from '../helpers/base64ToImage';
import { generatePIN, constructOtpObject, getFamilyStatusValue } from '../helpers/utilities';
import { throwError } from 'rxjs';
import { CommunesService } from '../entity/administration/commune/communes.service';
import { getRepository } from 'typeorm';
import { Commune } from '../entity/administration';

@Injectable()
export class RequestorService {

    communeRepository = getRepository(Commune);

    constructor(private readonly messageService: MessageService, private readonly otpService: OtpsService,
        private readonly requestService: RequestsService) { }

    async addRequest(requestForm: RequestFormObject): Promise<Response> {
        const response: Response = {} as Response;
        const currentTimeMillis = Date.now();
        const storedOtp = await this.otpService.getOtpByPhoneNumer(requestForm.phone);
        console.log('storedOtp', storedOtp)
        if (requestForm.verificationCode === storedOtp.verificationCode) {
            const requestToBeSaved = await this.constructRequestObject(requestForm);
            this.requestService.saveRequest(requestToBeSaved);
            response.code = HttpStatus.OK;
            response.message = 'تم حفظ بياناتك بنجاح';
        } else {
            response.status = 'failed';
            response.message = 'يرجى إدخال رمز صالح';
            response.code = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return response;
    }
    async constructRequestObject(requestForm: RequestFormObject) {
        const req = new Request();
        let info: string;
        req.status = RequestStatus.RECEIVED;
        req.hasRamed = requestForm.hasRamed;
        if (requestForm) {
            try {
                if (!this.isEmptyString(requestForm.phone)) {
                    req.phone = requestForm.phone;
                } else {
                    info = 'phone number';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.familyStatus)) {
                    req.familyStatus = getFamilyStatusValue(requestForm.familyStatus);
                } else {
                    info = 'family Status';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.childs)) {
                    req.childNumber = Number(requestForm.childs);
                } else {
                    info = 'Child number';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.fullName)) {
                    req.fullName = requestForm.fullName;
                } else {
                    info = 'full name';
                    throw new Error();
                }

                if (!this.isEmptyString(requestForm.address)) {
                    req.address = requestForm.address;
                } else {
                    info = 'address';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.cin)) {
                    req.cin = requestForm.cin;
                } else {
                    info = 'cin';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.cinRecto) && !this.isEmptyString(requestForm.cin)) {
                    const date = new Date().valueOf();
                    const base64Str = requestForm.cinRecto;
                    const block = base64Str.split(";");
                    const imageName = requestForm.cin + '_' + date;
                    // Get the format of the image
                    const format = block[0].split(":")[1];
                    const path = properties.imagesStore;
                    const optionalObj = { 'fileName': imageName, 'type': format };
                    const imageInfo = base64ToImage(base64Str, path, optionalObj);
                    req.cinRecto = imageInfo.fileName;
                } else {
                    info = 'cin recto';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.cinVerso) && !this.isEmptyString(requestForm.cin)) {
                    const date = new Date().valueOf();
                    const base64Str = requestForm.cinVerso;
                    const block = base64Str.split(";");
                    const imageName = requestForm.cin + '_' + date;
                    // Get the format of the image
                    const format = block[0].split(":")[1];
                    const path = properties.imagesStore;
                    const optionalObj = { 'fileName': imageName, 'type': format };
                    const imageInfo = base64ToImage(base64Str, path, optionalObj);
                    req.cinVerso = imageInfo.fileName;

                } else {
                    info = 'cin verso';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.jobType)) {
                    req.jobType = requestForm.jobType;
                } else {
                    info = 'job type';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.ramed)) {
                    req.ramedCardNumber = requestForm.ramed;
                } else {
                    info = 'ramed card number';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.jobAddress)) {
                    req.jobAddress = requestForm.jobAddress;
                } else {
                    info = 'job address';
                    throw new Error();
                }
                if (!this.isEmptyString(requestForm.authority_id)) {
                    req.authorityName = requestForm.authority_id;
                } else {
                    info = 'authority name';
                    throw new Error();
                }
                if (requestForm.commune && !this.isEmptyString(requestForm.commune.id)) {
                    const retrivedCommune = await this.communeRepository.findOne(requestForm.commune.id);
                    if (retrivedCommune) {
                        req.commune = retrivedCommune;
                    } else {
                        info = 'commune';
                        throw new Error();
                    }
                }
            } catch (error) {
                throw new Error('The ' + info + ' is mandatory');
            }
        }

        return req;
    }
    isEmptyString(value: string) {
        return (
            (typeof value === 'undefined')
            ||
            (value == null)
            ||
            (value.length === 0)
            ||
            (value === "")
        );
    }
    async generateOTP(phoneNumber: string): Promise<Response> {
        const generatedCode = generatePIN();
        const otp = constructOtpObject(phoneNumber, generatedCode);
        await this.otpService.save(otp);
        return this.messageService.sendSms(phoneNumber, properties.messageBody + generatedCode);
    }
}