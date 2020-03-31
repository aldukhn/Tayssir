import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Wilaya } from './wilaya.entity';
import { WilayasService } from './wilayas.service';
// import { serialize } from './response';

@Crud({
  model: { type: Wilaya },
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
@ApiTags('wilayas')
@Controller('/wilayas')
export class WilayasController {
  constructor(public service: WilayasService) {}
}
