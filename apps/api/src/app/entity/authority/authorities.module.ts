import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Authority } from './authority.entity';
import { AuthoritiesService } from './authorities.service';
import { AuthoritiesController } from './authorities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Authority])],
  providers: [AuthoritiesService],
  exports: [AuthoritiesService],
  controllers: [AuthoritiesController]
})
export class AuthoritiesModule {}
