import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserRole } from '../enums/UserRoleEnum';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.COMMON,
    nullable: false,
  })
  role: UserRole


  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };