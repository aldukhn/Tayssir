import {PrimaryGeneratedColumn, Column} from 'typeorm';

export class Administration {

  @Column()
  code: string;

  @Column({primary: true})
  id: string;


  @Column()
  name: string;

  @Column()
  nameAr: string;
}
