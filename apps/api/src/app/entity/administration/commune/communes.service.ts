import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Commune } from './commune.entity';

@Injectable()
export class CommunesService extends TypeOrmCrudService<Commune> {
  constructor(@InjectRepository(Commune) repo) {
    super(repo);
  }
}
