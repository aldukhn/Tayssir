import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Otp } from './otp.entity';

@Injectable()
export class OtpsService extends TypeOrmCrudService<Otp> {
  constructor(@InjectRepository(Otp) repo) {
    super(repo);
  }
}
