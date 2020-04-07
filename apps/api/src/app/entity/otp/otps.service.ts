import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Otp } from './otp.entity';
import { LessThan } from 'typeorm';

@Injectable()
export class OtpsService extends TypeOrmCrudService<Otp> {
  constructor(@InjectRepository(Otp) repo) {
    super(repo);
  }

  async save(otp: Otp): Promise<Otp> {
    const currentDateTimeMillis = this.getCurrentDateMillis();
    console.log("****************rrraaarrr*********** ", currentDateTimeMillis);
    const storedOtp = await this.repo.find({ where: { phone: otp.phone, expirationTime: LessThan(currentDateTimeMillis) } });

    if (storedOtp.length === 0) {
      return this.repo.save(otp);
    } else {
      throw new HttpException('رقم الهاتف هذا موجود بالفعل', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async  getOtpByPhoneNumer(phoneNumber: string): Promise<Otp> {
    const currentDateTimeMillis = this.getCurrentDateMillis();
    const otps = await this.repo.find({ where: { phone: phoneNumber, expirationTime: LessThan(currentDateTimeMillis) } });
    if (otps.length === 1) {
      return otps[0];
    } else {
      throw new HttpException('there is more than one element or no element', HttpStatus.NOT_FOUND);
    }

  }

  getCurrentDateMillis() {
    const nowDate = new Date();
    return Math.floor(nowDate.getTime() / 1000 + 900);
  }
}
