import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { Speaker } from '../speakers/speaker.entity';
import { Department } from '../departments/department.entity';
import { Registration } from '../registrations/registration.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Speaker) private speakersRepo: Repository<Speaker>,
    @InjectRepository(Department) private departmentsRepo: Repository<Department>,
    @InjectRepository(Registration) private regRepo: Repository<Registration>,
  ) {}

  async findAll() {
    const events = await this.eventsRepo.find({ relations: ['registrations'] });
    return events.map((e) => ({
      ...e,
      registrationsCount: e.registrations?.filter(r => r.active).length ?? 0,
      full: (e.registrations?.filter(r => r.active).length ?? 0) >= e.maxParticipants,
    }));
  }

  async findOne(id: number) {
    const event = await this.eventsRepo.findOne({ where: { id }, relations: ['registrations'] });
    if (!event) throw new NotFoundException('Event not found');
    return {
      ...event,
      registrationsCount: event.registrations?.filter(r => r.active).length ?? 0,
      full: (event.registrations?.filter(r => r.active).length ?? 0) >= event.maxParticipants,
    };
  }

  async create(data: { name: string; description: string; date: Date; maxParticipants: number; departmentId: number; speakerIds: number[]; }) {
    if (!data.speakerIds?.length) throw new BadRequestException('An event must have at least one speaker');
    const department = await this.departmentsRepo.findOne({ where: { id: data.departmentId } });
    if (!department) throw new BadRequestException('Department not found');
    const speakers = await this.speakersRepo.findByIds(data.speakerIds);
    if (speakers.length !== data.speakerIds.length) throw new BadRequestException('Some speakers not found');
    const event = this.eventsRepo.create({
      name: data.name,
      description: data.description,
      date: new Date(data.date),
      maxParticipants: data.maxParticipants,
      department,
      speakers,
    });
    return this.eventsRepo.save(event);
  }

  async update(id: number, data: { name?: string; description?: string; date?: Date; maxParticipants?: number; departmentId?: number; speakerIds?: number[]; }) {
    const event = await this.eventsRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (data.departmentId) {
      const dept = await this.departmentsRepo.findOne({ where: { id: data.departmentId } });
      if (!dept) throw new BadRequestException('Department not found');
      event.department = dept;
    }
    if (data.speakerIds) {
      if (data.speakerIds.length === 0) throw new BadRequestException('Event must have at least one speaker');
      const speakers = await this.speakersRepo.findByIds(data.speakerIds);
      if (speakers.length !== data.speakerIds.length) throw new BadRequestException('Some speakers not found');
      event.speakers = speakers;
    }
    if (data.name !== undefined) event.name = data.name;
    if (data.description !== undefined) event.description = data.description;
    if (data.date !== undefined) event.date = new Date(data.date);
    if (data.maxParticipants !== undefined) event.maxParticipants = data.maxParticipants;
    return this.eventsRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.eventsRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    await this.eventsRepo.remove(event);
  }
}
