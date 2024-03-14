import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { Reservation } from './Reservation.entity';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, name: 'email' })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false, name: 'password' })
  password: string;

  @Column({ type: 'varchar', nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'varchar', nullable: false, name: 'nickname' })
  nickname: string;

  @Column({ type: 'varchar', nullable: false, name: 'gender' })
  gender: string;

  @Column({ type: 'tinyint', nullable: false, name: 'age' })
  age: number;

  @Column({ type: 'varchar', unique: true, nullable: false, name: 'phone' })
  phone: string;

  @Column({ type: 'varchar', nullable: false, name: 'grade' })
  grade: string;

  @Column({ type: 'varchar', nullable: false, name: 'permission' })
  permission: string;

  @Column({ type: 'int', default: 1000000 })
  points: number;

  @Column({ type: 'enum', enum: Role, default: Role.User, name: 'Role' })
  role: Role;

  @CreateDateColumn({ name: 'createAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updateAt', comment: '수정일시' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleteAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  @JoinColumn()
  reservations: Reservation[];

  @ManyToMany(() => User, (user) => user.admins) // 다대다 관계 설정
  @JoinTable({
    name: 'admin_users', // Junction Table의 이름
    joinColumn: { name: 'user_id', referencedColumnName: 'id' }, // 현재 엔터티의 외래 키 설정
    inverseJoinColumn: { name: 'admin_id', referencedColumnName: 'id' }, // 연결된 엔터티의 외래 키 설정
  })
  admins: User[];
}
