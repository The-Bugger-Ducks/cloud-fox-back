import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/UserRoleEnum";
import { v4 as uuid } from 'uuid';
import { DataAccess } from "../enums/DataAccessEnum";
import { Station } from "./Station";

@Entity('')
export class Sensor{
    @PrimaryGeneratedColumn('increment')
    id: string;
  
    @Column()
    model: string;
  
    @Column("float")
    minrange: number;

    @Column("float")
    maxrange: number;

    @Column("float")
    accurace: number;

    @CreateDateColumn({name: 'start_date'})
    start_date: Date

    @CreateDateColumn({name: 'end_date'})
    end_date:Date

    @Column()
    unit: string;

  
    @Column({
      type: "enum",
      enum: DataAccess,
      default: DataAccess.PUBLIC,
      nullable: false,
    })
    role: DataAccess


    @ManyToOne(() => Station, station => station.sensor)
    @JoinColumn({name: 'idstation'})
    station: Station;
    
  
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }


}