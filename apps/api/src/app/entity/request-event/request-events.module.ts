import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestEvent } from './request-event.entity';
import { RequestEventsService } from './request-events.service';
import { RequestEventsController } from './request-events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEvent])],
  providers: [RequestEventsService],
  exports: [RequestEventsService],
  controllers: [RequestEventsController]
})
export class RequestEventsModule {}
