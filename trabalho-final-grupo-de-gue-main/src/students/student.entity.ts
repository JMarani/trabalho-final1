import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Registration } from '../registrations/registration.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  registration: string;

  @Column()
  course: string;

  @OneToMany(() => Registration, registration => registration.student)
  registrations: Registration[];
}
