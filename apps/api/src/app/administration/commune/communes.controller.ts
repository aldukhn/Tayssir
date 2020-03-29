import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Commune } from './commune.entity';
import { CommunesService } from './communes.service';
// import { serialize } from './response';

@Crud({
  model: { type: Commune },
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
@ApiTags('communes')
@Controller('/communes')
export class CommunesController {
  constructor(public service: CommunesService) {}
}
