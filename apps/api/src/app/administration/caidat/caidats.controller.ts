import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Caidat } from './caidat.entity';
import { CaidatsService } from './caidats.service';
// import { serialize } from './response';

@Crud({
  model: { type: Caidat },
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
@ApiTags('caidats')
@Controller('/caidats')
export class CaidatsController {
  constructor(public service: CaidatsService) {}
}
