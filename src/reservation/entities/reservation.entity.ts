import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Show } from '../../show/entities/show.entity';
import { Seat } from '../../seat/entities/seat.entity';

@Entity({ name: 'reservation' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Show, (show) => show.reservations)
  show: Show;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  seat: Seat;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;
}
