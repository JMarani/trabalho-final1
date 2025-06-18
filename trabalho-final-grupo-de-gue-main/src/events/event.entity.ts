import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Speaker } from '../speakers/speaker.entity';
import { Department } from '../departments/department.entity';
import { Registration } from '../registrations/registration.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('datetime')
  date: Date;

  @Column()
  maxParticipants: number;

  @ManyToMany(() => Speaker, speaker => speaker.events, { eager: true })
  @JoinTable()
  speakers: Speaker[];

  @ManyToOne(() => Department, department => department.events, { eager: true })
  department: Department;

  @OneToMany(() => Registration, registration => registration.event, { cascade: true })
  registrations: Registration[];
}
