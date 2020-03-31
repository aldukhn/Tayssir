import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Authority } from './authority.entity';
import { AuthoritiesService } from './authorities.service';
// import { serialize } from './response';

@Crud({
  model: { type: Authority },
  // serialize,
  params: {
    authorityKey: {
      field: 'authorityKey',
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
@ApiTags('authorities')
@Controller('/authorities')
export class AuthoritiesController {
  constructor(public service: AuthoritiesService) {}
}
