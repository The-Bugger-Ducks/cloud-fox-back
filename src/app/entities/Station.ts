import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sensor } from "./Sensor";
import { v4 as uuid } from 'uuid';



@Entity('')
export class Station{
    @PrimaryGeneratedColumn('increment')
    id: string;
  
    @Column("float")
    lat: number;
  
    @Column("float")
    long: number;

    @Column()
    localReference: string;


    @OneToMany(() =>  Sensor,(sensor) => sensor.station)
    sensor: Sensor[]

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
  
}