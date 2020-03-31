import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { FundingActor } from './funding-actor.entity';

@Injectable()
export class FundingActorsService extends TypeOrmCrudService<FundingActor> {
  constructor(@InjectRepository(FundingActor) repo) {
    super(repo);
  }
}
