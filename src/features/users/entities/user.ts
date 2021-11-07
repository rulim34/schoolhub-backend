import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { encrypt, lowercase } from '../../../core';
import { Transaction } from '../../transactions';

export enum Role {
  Admin = 'admin',
  Student = 'student',
  Guardian = 'guardian',
  Seller = 'seller',
}

@Entity('users')
@TableInheritance({
  column: {
    type: 'enum',
    name: 'role',
    enum: Role,
    select: true,
  },
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public role: Role;

  @Column()
  public name: string;

  @Column({
    unique: true,
    nullable: false,
    transformer: [lowercase],
  })
  public email: string;

  @Column({
    select: false,
    nullable: false,
    transformer: [encrypt],
  })
  public password: string;

  @OneToMany('Transaction', 'user')
  public transactions: Transaction[];

  @Column({
    default: 0,
  })
  public balance: number;

  @CreateDateColumn({
    name: 'created_time',
  })
  public createdTime: Date;

  @UpdateDateColumn({
    name: 'updated_time',
  })
  public updatedTime: Date;
}
