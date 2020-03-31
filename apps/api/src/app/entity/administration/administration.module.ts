import { Module } from '@nestjs/common';
import { CaidatsModule } from './caidat/caidats.module';
import { CirclesModule } from './circle/circles.module';
import { CommunesModule } from './commune/communes.module';
import { RegionsModule } from './region/regions.module';
import { WilayasModule } from './wilaya/wilayas.module';

@Module({
  imports: [
    CommunesModule,
    CirclesModule,
    CaidatsModule,
    RegionsModule,
    WilayasModule
  ]
})
export class AdministrationModule {}
