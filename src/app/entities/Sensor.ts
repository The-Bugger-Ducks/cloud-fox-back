import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Collect } from './Collect';
import { Station } from './Station';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  model: string;

  @Column()
  minRange: number;

  @Column()
  maxRange: number;

  @Column()
  factor: number;

  @Column()
  startDate: Date;

  @Column({
    nullable: true
  })
  endDate: Date;

  @Column()
  unit: string;

  @Column({ nullable: true })
  @JoinColumn({
    referencedColumnName: 'stations',
  })
  stationId: string;

  @ManyToOne(() => Station, (station) => station.sensors)
  @JoinColumn()
  station: Station;

  @OneToMany(() => Collect, (collect) => collect.sensor)
  @JoinColumn()
  collects: Collect[];

  @BeforeInsert()
  generate() {
    this.id = uuid()
  }
}