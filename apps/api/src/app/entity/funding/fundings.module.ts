import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Funding } from './funding.entity';
import { FundingsService } from './fundings.service';
import { FundingsController } from './fundings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funding])],
  providers: [FundingsService],
  exports: [FundingsService],
  controllers: [FundingsController]
})
export class FundingsModule {}
