import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Collect } from './Collect';


@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  name: string;

  @Column()
  startdate: Date;

  @OneToMany(() => Collect, (collect) => collect.station)
  collects: Collect[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}