import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { AdministrationModule } from './administration/administration.module';
import { RequestsModule } from './request/requests.module';
import { RequestEventsModule } from './request-event/request-events.module';
import { FundingsModule } from './funding/fundings.module';
import { FundingActorsModule } from './funding-actor/funding-actors.module';
import { RequestorController } from './requestor/requestor.controller';
import { MessageService } from '@tayssir/api-interfaces';
import { RequestorService } from './requestor/requestor.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AdministrationModule,
    RequestsModule,
    RequestEventsModule,
    FundingsModule,
    FundingActorsModule
  ],
  controllers: [RequestorController],
  providers: [MessageService, RequestorService]
})
export class AppModule {}
