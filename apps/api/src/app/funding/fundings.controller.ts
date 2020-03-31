import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Funding } from './funding.entity';
import { FundingsService } from './fundings.service';
// import { serialize } from './response';

@Crud({
  model: { type: Funding },
  // serialize,
  params: {
    fundingKey: {
      field: 'fundingKey',
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
@ApiTags('fundings')
@Controller('/fundings')
export class FundingsController {
  constructor(public service: FundingsService) {}
}
