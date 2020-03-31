import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Region } from './region.entity';

@Injectable()
export class RegionsService extends TypeOrmCrudService<Region> {
  constructor(@InjectRepository(Region) repo) {
    super(repo);
  }
}
