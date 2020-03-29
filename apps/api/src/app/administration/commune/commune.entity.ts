import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Administration } from '../Administration';
import { Circle } from '../circle/circle.entity';
import { Caidat } from '../caidat/caidat.entity';
import { Wilaya } from '../wilaya/wilaya.entity';

@Entity('commune', { schema: 'public' })
export class Commune extends Administration {
  @Column()
  isMunicipality: boolean;

  @Column()
  isArrondissment: boolean;

  @Column()
  isCenter: boolean;

  @ManyToOne(
    () => Circle,
    circle => circle.communes
  )
  @JoinColumn()
  circle: Circle;

  @ManyToOne(
    () => Caidat,
    caidat => caidat.communes
  )
  @JoinColumn()
  caidat: Caidat;

  @ManyToOne(
    () => Wilaya,
    wilaya => wilaya.communes
  )
  @JoinColumn()
  wilaya: Wilaya;
}
