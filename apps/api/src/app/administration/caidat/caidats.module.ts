import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Caidat } from './caidat.entity';
import { CaidatsService } from './caidats.service';
import { CaidatsController } from './caidats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Caidat])],
  providers: [CaidatsService],
  exports: [CaidatsService],
  controllers: [CaidatsController]
})
export class CaidatsModule {}
