import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { AdministrationModule } from './administration/administration.module';
import { RequestorController } from './requestor/requestor.controller';
import { MessageService } from '@tayssir/api-interfaces';
import { RequestorService } from './requestor/requestor.service';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AdministrationModule],
  controllers: [RequestorController],
  providers: [MessageService, RequestorService]
})
export class AppModule {}
