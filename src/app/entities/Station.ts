import { Entity, Column, OneToMany, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Sensor } from './Sensor';


@Entity('stations')
export class Station {
  [x: string]: any;
  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany(() => Sensor, (sensor) => sensor.station)
  @JoinColumn()
  sensors: Sensor[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}