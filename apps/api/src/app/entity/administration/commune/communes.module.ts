import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Commune } from './commune.entity';
import { CommunesService } from './communes.service';
import { CommunesController } from './communes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Commune])],
  providers: [CommunesService],
  exports: [CommunesService],
  controllers: [CommunesController]
})
export class CommunesModule {}
