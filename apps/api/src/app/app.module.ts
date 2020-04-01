import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { AdministrationModule } from './entity/administration/administration.module';
import { RequestsModule } from './entity/request/requests.module';
import { RequestEventsModule } from './entity/request-event/request-events.module';
import { FundingsModule } from './entity/funding/fundings.module';
import { FundingActorsModule } from './entity/funding-actor/funding-actors.module';
import { RequestorController } from './requestor/requestor.controller';
import { MessageService } from '@tayssir/api-interfaces';
import { RequestorService } from './requestor/requestor.service';
import { OtpsModule } from './entity/otp/otps.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AdministrationModule,
    RequestsModule,
    RequestEventsModule,
    FundingsModule,
    FundingActorsModule,
    OtpsModule
  ],
  controllers: [RequestorController],
  providers: [MessageService, RequestorService]
})
export class AppModule { }
