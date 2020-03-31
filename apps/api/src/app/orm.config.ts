import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {RequestEvent} from "./entity/request-event/request-event.entity";
import {Authority} from "./entity/authority/authority.entity";
import {Request} from "./entity/request/request.entity";
import {Funding} from "./entity/funding/funding.entity";
import {FundingActor} from "./entity/funding-actor/funding-actor.entity";
import {Region} from "./entity/administration/region/region.entity";
import {Circle, Commune} from "./entity/administration";
import {Wilaya} from "./entity/administration/wilaya/wilaya.entity";
import {Caidat} from "./entity/administration/caidat/caidat.entity";
import {Otp} from "./entity/otp/otp.entity";

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tayssir_v2',
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  entities: [RequestEvent, Authority,Request,Funding,FundingActor,Circle,Wilaya,Commune,Caidat,Otp
  ]
};
