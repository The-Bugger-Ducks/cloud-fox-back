import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Collect } from './Collect';
import { Station } from './Station';

@Entity('sensors')
export class Sensor {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  model: string;

  @Column()
  minRange: number;

  @Column()
  maxRange: number;

  @Column()
  accuracy: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  unit: string;

  @ManyToOne(() => Station, (station) => station.sensors)
  station: Station;

  @OneToMany(() => Collect, (collect) => collect.sensor)
  collects: Collect[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}