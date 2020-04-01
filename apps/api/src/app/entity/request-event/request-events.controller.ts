import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { RequestEvent } from './request-event.entity';
import { RequestEventsService } from './request-events.service';
// import { serialize } from './response';

@Crud({
  model: { type: RequestEvent },
  // serialize,
  params: {
    requestEventKey: {
      field: 'requestEventKey',
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
@ApiTags('request-events')
@Controller('/request-events')
export class RequestEventsController {
  constructor(public service: RequestEventsService) {}
}
