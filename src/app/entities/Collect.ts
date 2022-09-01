import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Sensor } from './Sensor';

@Entity('collects')
export class Collect {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  moment: Date;

  @Column()
  value: number;

  @ManyToOne(() => Sensor, (sensor) => sensor.collects)
  sensor: Sensor;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}