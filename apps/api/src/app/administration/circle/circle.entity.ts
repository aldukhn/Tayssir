import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Administration } from '../Administration';
import { Commune } from '../commune/commune.entity';
import { Wilaya } from '../wilaya/wilaya.entity';

@Entity('circle', { schema: 'public' })
export class Circle extends Administration {
  @OneToMany(
    () => Commune,
    commune => commune.circle
  )
  communes: Commune[];

  @ManyToOne(
    () => Wilaya,
    wilaya => wilaya.circles
  )
  @JoinColumn()
  wilaya: Wilaya;
}
