import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Request } from './request.entity';

@Injectable()
export class RequestsService extends TypeOrmCrudService<Request> {
  constructor(@InjectRepository(Request) repo) {
    super(repo);
  }


  /**
   * 
   * @param request 
   */
  saveRequest(request: Request) {
    this.repo.save(request);
  }
}
