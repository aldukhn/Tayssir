import { Entity, OneToMany } from 'typeorm';
import { Administration } from '../Administration';
import { Commune } from '../commune/commune.entity';

@Entity('caidat', { schema: 'public' })
export class Caidat extends Administration {
  @OneToMany(
    () => Commune,
    commune => commune.caidat
  )
  communes: Commune[];
}
