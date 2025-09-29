import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Choice } from './choice.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  singleChoice: boolean;

  @OneToMany(() => Choice, (choice) => choice.poll, { cascade: true })
  choices: Choice[];
}
