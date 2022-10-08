import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert } from 'typeorm';
import { Measurement } from './Measurement';
import { ParameterType } from './ParameterType';
import { Station } from './Station';

@Entity('parameter')
export class Parameter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  @JoinColumn({ referencedColumnName: 'station' })
  stationId: string;

  @ManyToOne(() => Station, (station) => station.parameters)
  @JoinColumn()
  station: string;


  @Column({ nullable: true })
  @JoinColumn({ referencedColumnName: 'parameterType' })
  parameterTypeId: number;

  @ManyToOne(() => ParameterType, (parameterType) => parameterType.parameter)
  @JoinColumn()
  parameterType: ParameterType;


  @OneToMany(() => Measurement, (measurement) => measurement.parameter)
  @JoinColumn()
  measurements: Measurement[];
}