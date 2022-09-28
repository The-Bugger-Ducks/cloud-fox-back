import { Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { Parameter } from './Parameter';


@Entity('station')
export class Station {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  name: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  description: string;

  @Column()
  startdate: number;

  @Column()
  isActive: boolean;

  @OneToMany(() => Parameter, (parameter) => parameter.station)
  @JoinColumn()
  parameters: Parameter[];
}