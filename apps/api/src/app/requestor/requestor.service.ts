import { Injectable, HttpStatus } from '@nestjs/common';
import { MessageService, RequestFormObject, RequestStatus } from '@tayssir/api-interfaces';
import { Response } from 'libs/api-interfaces/src/lib/Response';
import { properties } from 'apps/api/properties';
import { Otp } from '../entity/otp/otp.entity';
import { OtpsService } from '../entity/otp/otps.service';
import { RequestsService } from '../entity/request/requests.service';
import { Request, FamilyStatus } from '../entity/request/request.entity';
import { Authority } from '../entity/authority/authority.entity';
import { Commune } from '../entity/administration';
import { base64ToImage } from '../helpers/base64ToImage';
import { generatePIN, constructOtpObject } from '../helpers/utilities';

@Injectable()
export class RequestorService {

    constructor(private readonly messageService: MessageService, private readonly otpService: OtpsService, private readonly requestService: RequestsService) { }

    async addRequest(requestForm: RequestFormObject): Promise<Response> {
        let response: Response = {} as Response;
        const currentTimeMillis = Date.now();
        const storedOtp = await this.otpService.getOtpByPhoneNumer(requestForm.phone);
        if (requestForm.verificationCode === storedOtp.verificationCode) {
            //TODO : save request into database
            const requestToBeSaved = this.constructRequestObject(requestForm);
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
    constructRequestObject(requestForm: RequestFormObject) {
        const req = new Request();
        const date = new Date().valueOf();
        if (requestForm) {
            if (!this.isEmptyString(requestForm.phone)) {
                req.phone = requestForm.phone;
            }
            if (!this.isEmptyString(requestForm.familyStatus)) {
                req.familyStatus = this.getFamilyStatusValue(requestForm.familyStatus);
            }
            if (!this.isEmptyString(requestForm.childs)) {
                req.childNumber = Number(requestForm.childs);
            }

            req.hasRamed = requestForm.hasRamed;

            if (!this.isEmptyString(requestForm.fullName)) {
                req.fullName = requestForm.fullName;
            }

            if (!this.isEmptyString(requestForm.address)) {
                req.address = requestForm.address;
            }
            if (!this.isEmptyString(requestForm.cin)) {
                req.cin = requestForm.cin;
            }
            if (!this.isEmptyString(requestForm.cinRecto) && !this.isEmptyString(requestForm.cin)) {
                const base64Str = requestForm.cinRecto;
                const block = base64Str.split(";");
                const imageName = requestForm.cin + '_' + date;
                // Get the format of the image
                const format = block[0].split(":")[1];
                const path = properties.imagesStore;
                const optionalObj = { 'fileName': imageName, 'type': format };
                const imageInfo = base64ToImage(base64Str, path, optionalObj);
                //TODO: to be confirmed if we save just image name or  also imagesStore
                req.cinRecto = imageInfo.fileName;
            }
            if (!this.isEmptyString(requestForm.cinVerso) && !this.isEmptyString(requestForm.cin)) {
                const base64Str = requestForm.cinVerso;
                const block = base64Str.split(";");
                const imageName = requestForm.cin + '_' + date;
                // Get the format of the image
                const format = block[0].split(":")[1];
                const path = properties.imagesStore;
                const optionalObj = { 'fileName': imageName, 'type': format };
                const imageInfo = base64ToImage(base64Str, path, optionalObj);
                //TODO: to be confirmed if we save just image name or  also imagesStore
                req.cinVerso = imageInfo.fileName;
            }
            if (!this.isEmptyString(requestForm.jobType)) {
                req.jobType = requestForm.jobType;
            }
            if (!this.isEmptyString(requestForm.ramed)) {
                req.ramedCardNumber = requestForm.ramed;
            }
            if (!this.isEmptyString(requestForm.jobAddress)) {
                req.jobAddress = requestForm.jobAddress;
            }
            if (!this.isEmptyString(requestForm.authority_id)) {

                //TODO: 
                //get authority by given id to assigne it to ower object
                const assignedAuthority = new Authority();
                //assignedAuthority = object form DB 
                //req.assignedToAuthority = assignedAuthority;
            }
            if (requestForm.commune && !this.isEmptyString(requestForm.commune.id)) {
                //TODO get commune by id from DB
                const commune = new Commune();
                // req.commune = commune;
            }

            //init status request
            req.status = RequestStatus.RECEIVED;

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