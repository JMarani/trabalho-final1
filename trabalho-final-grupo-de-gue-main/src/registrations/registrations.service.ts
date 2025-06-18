import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registration } from './registration.entity';
import { Event } from '../events/event.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration) private regRepo: Repository<Registration>,
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Student) private studentsRepo: Repository<Student>,
  ) {}

  async register(eventId: number, studentId: number) {
    const event = await this.eventsRepo.findOne({ where: { id: eventId }, relations: ['registrations'] });
    if (!event) throw new NotFoundException('Event not found');
    if (event.date < new Date()) throw new BadRequestException('Event already occurred');
    const student = await this.studentsRepo.findOne({ where: { id: studentId }, relations: ['registrations', 'registrations.event'] });
    if (!student) throw new NotFoundException('Student not found');

    const activeRegs = event.registrations?.filter(r => r.active) || [];
    if (activeRegs.length >= event.maxParticipants) throw new BadRequestException('Event is full');

    const existing = activeRegs.find(r => r.student.id === studentId);
    if (existing) throw new BadRequestException('Student already registered');

    // check date conflicts
    const studentActiveRegs = student.registrations?.filter(r => r.active) || [];
    if (studentActiveRegs.some(r => r.event.id !== eventId && r.event.date.getTime() === event.date.getTime())) {
      throw new BadRequestException('Student already registered in event at same time');
    }

    const registration = this.regRepo.create({ registeredAt: new Date(), event, student, active: true });
    return this.regRepo.save(registration);
  }

  async listByStudent(studentId: number) {
    const student = await this.studentsRepo.findOne({ where: { id: studentId }, relations: ['registrations', 'registrations.event'] });
    if (!student) throw new NotFoundException('Student not found');
    return student.registrations;
  }

  async cancel(regId: number) {
    const reg = await this.regRepo.findOne({ where: { id: regId } });
    if (!reg) throw new NotFoundException('Registration not found');
    reg.active = false;
    return this.regRepo.save(reg);
  }
}
