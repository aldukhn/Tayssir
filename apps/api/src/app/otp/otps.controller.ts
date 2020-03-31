import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Otp } from './otp.entity';
import { OtpsService } from './otps.service';
// import { serialize } from './response';

@Crud({
  model: { type: Otp },
  // serialize,
  params: {
    otpKey: {
      field: 'otpKey',
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
@ApiTags('otps')
@Controller('/otps')
export class OtpsController {
  constructor(public service: OtpsService) {}
}
