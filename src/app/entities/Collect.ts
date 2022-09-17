import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Station } from './Station';

@Entity('collects')
export class Collect {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  moment: number;

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
  WindDirectionValue: number;
  @Column()
  WindDirectionUnit: string;

  @Column()
  WindVelocityValue: number;
  @Column()
  WindVelocityUnit: string;

  @ManyToOne(() => Station, (station) => station.collects)
  @JoinColumn()
  station: Station;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}