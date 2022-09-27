import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Sensor } from './Sensor';
import { Station } from './Station';

@Entity('collects')
export class Collect {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  moment: number;

  @Column()
  value: number;

  @Column({ nullable: true })
  @JoinColumn()
  sensorId: string

  @ManyToOne(() => Sensor, (sensor) => sensor.collects)
  @JoinColumn()
  sensor: Sensor;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}