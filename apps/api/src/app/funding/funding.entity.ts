import {Entity, OneToMany, Column, ManyToOne, JoinColumn} from 'typeorm';
import {BaseEntity} from '../base-entity';
import {Request} from '../request/request.entity';
import {FundingActor} from '../funding-actor/funding-actor.entity';

@Entity('funding', {schema: 'public'})
export class Funding extends BaseEntity {
  @ManyToOne(
    type => Request,
    request => request.fundings
  )
  @JoinColumn()
  request: Request;

  @ManyToOne(
    type => FundingActor,
    actor => actor.fundings
  )
  @JoinColumn()
  actor: FundingActor;

  @Column()
  value: string;
  @Column()
  type: FundingType;
  @Column()
  fundingYear: number;
  @Column()
  fundingMonth: number;
  @Column()
  creationDate: Date;
  @Column()
  isProcessed: boolean;
  @Column()
  fundingCode:string;


}


enum FundingType {
  MANDATI, GAB, MWALLET
}
