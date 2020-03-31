import {Entity, ManyToOne, JoinColumn, Column} from 'typeorm';
import {BaseEntity} from '../base-entity';
import {Request} from '../request/request.entity';
import {Authority} from "../authority/authority.entity";

@Entity('request-event', {schema: 'public'})
export class RequestEvent extends BaseEntity {
  @ManyToOne(
    type => Request,
    request => request.events
  )
  @JoinColumn()
  request: Request;

  @ManyToOne(
    type => Authority
  )
  @JoinColumn()
  authority: Authority | null;

  @Column()
  newStatus: String;
  @Column()
  previousStatus: String;
  @Column()
  updateDate: Date;
}
