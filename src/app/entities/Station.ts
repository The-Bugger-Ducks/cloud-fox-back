import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Collect } from './Collect';
import { Solicitation } from './Solicitation';


@Entity('stations')
export class Station {
  @PrimaryColumn({
    default: false,
    nullable: false,
  })
  id: string;

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

  @OneToMany(() => Collect, (collect) => collect.station)
  collects: Collect[];
}