import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Station } from './Station';

@Entity('collects')
export class Collect {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  moment: Date;

  @Column()
  pluvValue: number;

  @Column()
  pluvUnit: string;

  @Column()
  heatValue: number;

  @Column()
  heatUnit: string;

  @Column()
  atmPresValue: number;

  @Column()
  atmPresUnit: string;

  @Column()
  humidityValue: number;

  @Column()
  humidityUnit: string;

  @Column()
  WindDirection: string;

  @Column()
  WindVelocity: number;

  @ManyToOne(() => Station, (station) => station.collects)
  station: Station;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}