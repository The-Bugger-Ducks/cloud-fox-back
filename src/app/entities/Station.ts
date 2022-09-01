import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Sensor } from './Sensor';

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  localReference: string;

  @OneToMany(() => Sensor, (sensor) => sensor.station)
  sensors: Sensor[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}