import { Entity, OneToMany } from 'typeorm';
import { Administration } from '../Administration';
import { Wilaya } from '../wilaya/wilaya.entity';

@Entity('region', { schema: 'public' })
export class Region extends Administration {
  @OneToMany(
    () => Wilaya,
    wilaya => wilaya.region
  )
  wilayas: Wilaya[];
}
