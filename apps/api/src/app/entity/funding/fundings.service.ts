import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Funding } from './funding.entity';

@Injectable()
export class FundingsService extends TypeOrmCrudService<Funding> {
  constructor(@InjectRepository(Funding) repo) {
    super(repo);
  }
}
