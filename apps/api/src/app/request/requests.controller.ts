import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Request } from './request.entity';
import { RequestsService } from './requests.service';
// import { serialize } from './response';

@Crud({
  model: { type: Request },
  // serialize,
  params: {
    requestKey: {
      field: 'requestKey',
      type: 'uuid',
      primary: true
    }
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true
    }
  }
})
@ApiTags('requests')
@Controller('/requests')
export class RequestsController {
  constructor(public service: RequestsService) {}
}
