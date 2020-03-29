import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { RequestEvent } from './request-event.entity';

@Injectable()
export class RequestEventsService extends TypeOrmCrudService<RequestEvent> {
  constructor(@InjectRepository(RequestEvent) repo) {
    super(repo);
  }
}
