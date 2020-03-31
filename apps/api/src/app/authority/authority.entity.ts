import { Entity, OneToMany, Column } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Request } from '../request/request.entity';

@Entity('authority', { schema: 'public' })
export class Authority extends BaseEntity {
  @Column()
  id: number;

  @Column()
  phone: number;

  @Column()
  isEnabled: boolean;

  @Column()
  fullName: string;

  @Column()
  hashPwd: boolean;

  // @OneToMany(
  //   type => Request,
  //   request => request.assignedToAuthority
  // )
  // assignedRequests: Request[];

  // @OneToMany(
  //   type => Request,
  //   request => request.processedByAuthority
  // )
  // processedRequests: Request[];
}
