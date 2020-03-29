import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Caidat } from './caidat.entity';

@Injectable()
export class CaidatsService extends TypeOrmCrudService<Caidat> {
  constructor(@InjectRepository(Caidat) repo) {
    super(repo);
  }
}
