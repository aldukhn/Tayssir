import {Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { Administration } from '../Administration';
import { Commune } from '../commune/commune.entity';

@Entity('caidat', { schema: 'public' })
export class Caidat extends Administration {
  @ManyToMany(
    type => Commune
  )
  @JoinTable()
  communes: Commune[];
}
