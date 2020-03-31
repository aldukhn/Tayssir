import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Otp } from './otp.entity';
import { OtpsService } from './otps.service';
import { OtpsController } from './otps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpsService],
  exports: [OtpsService],
  controllers: [OtpsController]
})
export class OtpsModule {}
