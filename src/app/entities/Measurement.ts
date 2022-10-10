import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Parameter } from './Parameter';

@Entity('measurement')
export class Measurement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  moment: number;

  @Column()
  value: number;


  @Column({ nullable: true })
  @JoinColumn()
  parameterId: number

  @ManyToOne(() => Parameter, (parameter) => parameter.measurements)
  @JoinColumn()
  parameter: Parameter;
}