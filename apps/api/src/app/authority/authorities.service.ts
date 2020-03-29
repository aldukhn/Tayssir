import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Authority } from './authority.entity';

@Injectable()
export class AuthoritiesService extends TypeOrmCrudService<Authority> {
  constructor(@InjectRepository(Authority) repo) {
    super(repo);
  }
}
