import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Region } from './region.entity';
import { RegionsService } from './regions.service';
// import { serialize } from './response';

@Crud({
  model: { type: Region },
  // serialize,
  params: {
    regionKey: {
      field: 'regionKey',
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
@ApiTags('regions')
@Controller('/regions')
export class RegionsController {
  constructor(public service: RegionsService) {}
}
