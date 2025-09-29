import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poll } from './poll.entity';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ default: 0 })
  votes: number;

  @ManyToOne(() => Poll, (poll) => poll.choices, { onDelete: 'CASCADE' })
  poll: Poll;
}
