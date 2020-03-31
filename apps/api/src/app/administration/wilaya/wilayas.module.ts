import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Wilaya } from './wilaya.entity';
import { WilayasService } from './wilayas.service';
import { WilayasController } from './wilayas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wilaya])],
  providers: [WilayasService],
  exports: [WilayasService],
  controllers: [WilayasController]
})
export class WilayasModule {}
