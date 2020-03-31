import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Wilaya } from './wilaya.entity';

@Injectable()
export class WilayasService extends TypeOrmCrudService<Wilaya> {
  constructor(@InjectRepository(Wilaya) repo) {
    super(repo);
  }
}
