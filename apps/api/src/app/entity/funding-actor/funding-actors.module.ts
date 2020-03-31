import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FundingActor } from './funding-actor.entity';
import { FundingActorsService } from './funding-actors.service';
import { FundingActorsController } from './funding-actors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FundingActor])],
  providers: [FundingActorsService],
  exports: [FundingActorsService],
  controllers: [FundingActorsController]
})
export class FundingActorsModule {}
