import { FamilyStatus } from "../entity/request/request.entity";
import { Otp } from '../entity/otp/otp.entity';

export function constructOtpObject(phoneNumber: string, generatedCode: number) {
    const otp = new Otp();
    otp.createdAt = new Date();
    otp.updatedAt = new Date();
    //otp expire dans 15 minutes
    const nowDate = new Date();
    otp.expirationTime = Math.floor(nowDate.getTime() / 1000 + 900);
    otp.phone = phoneNumber;
    otp.verificationCode = generatedCode;
    return otp
}
export function generatePIN(): number {
    return Math.floor(100000 + Math.random() * 900000);
}

export function getFamilyStatusValue(familyStatus: string): FamilyStatus {
    if (familyStatus === 'single') {
        return FamilyStatus.SINGLE;
    } else if (familyStatus === 'married') {
        return FamilyStatus.MARRIED;
    } else if (familyStatus === 'divorced') {
        return FamilyStatus.DIVORCED;
    } else if (familyStatus === 'widow') {
        return FamilyStatus.WIDOW;
    }
}

export function isEmptyString(value: string) {
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