import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class Administration {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  nameAr: string;
}
