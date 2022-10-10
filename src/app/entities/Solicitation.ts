import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";


@Entity('solicitation')
export class Solicitation {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  roleReq: string;

  @OneToOne(() => User, (user) => user.solicitations)
  @JoinColumn()
  user: User

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}


