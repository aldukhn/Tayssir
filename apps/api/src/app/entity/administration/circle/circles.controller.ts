import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Circle } from './circle.entity';
import { CirclesService } from './circles.service';
// import { serialize } from './response';

@Crud({
  model: { type: Circle },
  // serialize,
  params: {
    communeKey: {
      field: 'communeKey',
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
@ApiTags('circles')
@Controller('/circles')
export class CirclesController {
  constructor(public service: CirclesService) {}
}
