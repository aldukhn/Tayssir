import { Entity, JoinColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { BaseEntity } from '../../base-entity';
import { Authority } from '../authority/authority.entity';
import { RequestEvent } from '../request-event/request-event.entity';
import { Funding } from '../funding/funding.entity';
import { Commune } from '../administration/commune/commune.entity';



export enum FamilyStatus {
  SINGLE, MARRIED, DIVORCED, WIDOW
}


export enum RequestStatus {
  RECEIVED,
  VALIDATED,
  CONFIRMED,
  REJECTED
}



@Entity('request', { schema: 'public' })
export class Request extends BaseEntity {
  @ManyToOne(
    type => Authority,
    authority => authority.assignedRequests
  )
  @JoinColumn()
  assignedToAuthority: Authority;

  @ManyToOne(
    type => Authority,
    authority => authority.processedRequests
  )
  @JoinColumn()
  processedByAuthority: Authority;

  @ManyToOne(
    type => Authority
    //    authority => authority.processedRequests
  )
  @JoinColumn()
  processedByChiefAuthorityId: Authority;

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

  @Column()
  id: number;

  @Column()
  fullName: string;

  @Column()
  cin: string;

  @Column()
  cinRecto: string;

  @Column()
  cinVerso: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  jobAddress: string;

  @Column()
  jobType: string;

  @ManyToOne(
    type => Commune
  )
  @JoinColumn()
  commune: Commune;

  @Column({ enum: RequestStatus })
  status: RequestStatus;

  @Column({ nullable: true })
  rejectReason: string;

  @Column({ nullable: true })
  statusUpdateDate: Date;

  @Column()
  familyStatus: FamilyStatus;

  @Column()
  childNumber: number;

  @Column()
  hasRamed: boolean;

  @Column()
  ramedCardNumber: string;

}
