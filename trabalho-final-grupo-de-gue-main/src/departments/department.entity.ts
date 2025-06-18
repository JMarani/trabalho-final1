import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Event } from '../events/event.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  acronym: string;

  @Column()
  head: string;

  @OneToMany(() => Event, event => event.department)
  events: Event[];
}
