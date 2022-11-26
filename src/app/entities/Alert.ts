import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Parameter } from './Parameter';



@Entity('alert')
export class Alert {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  minLowAlert: number;
  @Column()
  maxLowAlert: number;

  @Column()
  minMediumAlert: number;
  @Column()
  maxMediumAlert: number;

  @Column()
  minHighAlert: number;
  @Column()
  maxHighAlert: number;

  @Column()
  created_at: number;

  @OneToOne(() => Parameter, (parameter) => parameter.alert)
  @JoinColumn()
  parameter: Alert;
}