import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert } from 'typeorm';
import { Parameter } from './Parameter';

@Entity('parameterType')
export class ParameterType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @Column()
  factor: number;

  @Column()
  type: string;

  @OneToMany(() => Parameter, (parameter) => parameter.parameterType)
  @JoinColumn()
  parameter: Parameter[];
}