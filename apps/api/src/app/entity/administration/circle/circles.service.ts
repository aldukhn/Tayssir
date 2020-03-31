import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Circle } from './circle.entity';

@Injectable()
export class CirclesService extends TypeOrmCrudService<Circle> {
  constructor(@InjectRepository(Circle) repo) {
    super(repo);
  }
}
