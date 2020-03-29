import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base-entity';
// import { Authority } from '../authority/authority.entity';
import { RequestEvent } from '../request-event/request-event.entity';
import { Funding } from '../funding/funding.entity';


@Entity('request', { schema: 'public' })
export class Request extends BaseEntity {
  // @ManyToOne(
  //   type => Authority,
  //   authority => authority.assignedRequests
  // )
  // @JoinColumn()
  // assignedToAuthority: Authority;

  // @ManyToOne(
  //   type => Authority,
  //   authority => authority.processedRequests
  // )
  // @JoinColumn()
  // processedByAuthority: Authority;

  @OneToMany(
    type => RequestEvent,
    requestEvent => requestEvent.request
  )
  events: RequestEvent[];

  @OneToMany(
    type => Funding,
    funding => funding.request
  )
  fundings: Funding[];
}
