import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Region } from './region.entity';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionsService],
  exports: [RegionsService],
  controllers: [RegionsController]
})
export class RegionsModule {}
