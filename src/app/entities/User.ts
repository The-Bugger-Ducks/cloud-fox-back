import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserRole } from '../enums/UserRoleEnum';
import { Solicitation } from './Solicitation';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  imgSrc: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.SIMPLE,
    nullable: false,
  })
  role: UserRole

  @OneToOne(() => Solicitation, (solicitation) => solicitation.user)
  solicitations: Solicitation[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}