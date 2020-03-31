import {Entity, OneToMany, Column, ManyToOne} from 'typeorm';
import {BaseEntity} from '../../base-entity';
import {Request} from '../request/request.entity';
import {Caidat} from "../administration/caidat/caidat.entity";
import {RequestEvent} from "../request-event/request-event.entity";

@Entity('authority', {schema: 'public'})
export class Authority extends BaseEntity {

  @OneToMany(
    type => Request,
    request => request.assignedToAuthority
  )
  assignedRequests: Request[];


  @OneToMany(
    type => RequestEvent,
    requestEvent => requestEvent.request
  )
  events: RequestEvent[];
  @OneToMany(
    type => Request,
    request => request.processedByAuthority
  )
  processedRequests: Request[];
  @Column()
  phone: number;

  @Column()
  isEnabled: boolean;

  @Column()
  fullName: string;

  @Column()
  hashPwd: boolean;

  @ManyToOne(
    type => Authority
  )
  chiefAuthority: Authority | null;

  @ManyToOne(
    type => Caidat
  )
  caidat: Caidat;

  @Column()
  authorityRole: AuthorityRole;

}

enum AuthorityRole {
  AGENT, CHIEF
}
