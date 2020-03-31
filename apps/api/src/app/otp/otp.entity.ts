import { Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('otp', { schema: 'public' })
export class Otp extends BaseEntity {
  
}
