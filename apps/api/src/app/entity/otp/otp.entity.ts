import { Entity } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('otp', { schema: 'public' })
export class Otp extends BaseEntity {
  @Column()
  phone:string;
  @Column()
  verificationCode:string;
  @Column()
  expirationTime:number;

}
