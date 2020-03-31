import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Administration } from '../Administration';
import { Circle } from '../circle/circle.entity';
import { Wilaya } from '../wilaya/wilaya.entity';
import { Caidat } from '../caidat/caidat.entity';

export enum CommuneType {
  ARRONDISSEMENT,
  CENTER,
  MUNICIPALITY,
  COMMUNE
}

@Entity('commune', { schema: 'public' })
export class Commune extends Administration {
  @Column()
  type: CommuneType;

  @ManyToOne(
    type => Circle,
    circle => circle.communes
  )
  @JoinColumn()
  circle: Circle;

  @ManyToOne(
    type => Wilaya,
    wilaya => wilaya.communes
  )
  @JoinColumn()
  wilaya: Wilaya;
}
