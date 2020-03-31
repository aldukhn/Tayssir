import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Request } from '../request/request.entity';

@Entity('request-event', { schema: 'public' })
export class RequestEvent extends BaseEntity {
  @ManyToOne(
    type => Request,
    request => request.events
  )
  @JoinColumn()
  request: Request;
}
