import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Event } from '../events/event.entity';
import { Student } from '../students/student.entity';

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  registeredAt: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Event, event => event.registrations, { onDelete: 'CASCADE' })
  event: Event;

  @ManyToOne(() => Student, student => student.registrations, { eager: true })
  student: Student;
}
