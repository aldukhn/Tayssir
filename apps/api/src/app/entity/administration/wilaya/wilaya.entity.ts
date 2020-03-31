import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Administration } from '../Administration';
import { Commune } from '../commune/commune.entity';
import { Circle } from '../circle/circle.entity';
import { Region } from '../region/region.entity';

@Entity('wilaya', { schema: 'public' })
export class Wilaya extends Administration {
  @OneToMany(
    type => Circle,
    circle => circle.wilaya
  )
  circles: Circle[];

  @OneToMany(
    type => Commune,
    commune => commune.wilaya
  )
  communes: Commune[];

  @ManyToOne(
    type => Region,
    region => region.wilayas
  )
  @JoinColumn()
  region: Region;
}
