import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'show' })
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false, name: 'image' })
  image: number;

  @Column({ type: 'varchar', nullable: false, name: 'Title' })
  Title: string;

  @Column({ type: 'varchar', nullable: false, name: 'Cast' })
  Cast: string;

  @Column({ type: 'varchar', nullable: false, name: 'Genre' })
  Genre: string;

  @Column({ type: 'varchar', nullable: false, name: 'content' })
  content: string;

  @Column({ type: 'varchar', nullable: false, name: 'DateTime' })
  DateTime: string;

  @Column({ type: 'varchar', nullable: false, name: 'showVenue' })
  showVenue: string;

  @Column({ type: 'date', nullable: false, name: 'RunTime' })
  RunTime: Date;

  @Column({ type: 'integer', nullable: false, name: 'Price' })
  Price: number;

  @Column({ type: 'integer', nullable: false, name: 'seat' })
  seat: number;

  @CreateDateColumn({ name: 'createdAt', comment: '생성일시' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', comment: '수정일시' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt', comment: '삭제일시' })
  deletedAt?: Date | null;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservations: Reservation[];

  @OneToMany(() => SetMetadata, (seat) => seat.show)
  seats: Seat[];
}
