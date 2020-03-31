import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { FundingActor } from './funding-actor.entity';
import { FundingActorsService } from './funding-actors.service';
// import { serialize } from './response';

@Crud({
  model: { type: FundingActor },
  // serialize,
  params: {
    fundingActorKey: {
      field: 'fundingActorKey',
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
@ApiTags('funding-actors')
@Controller('/funding-actors')
export class FundingActorsController {
  constructor(public service: FundingActorsService) {}
}
