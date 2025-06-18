import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Event } from '../events/event.entity';

@Entity()
export class Speaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  resume: string;

  @Column()
  institution: string;

  @ManyToMany(() => Event, event => event.speakers)
  events: Event[];
}
