import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserRole } from '../enums/UserRoleEnum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.SIMPLE,
    nullable: false,
  })
  role: UserRole


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}