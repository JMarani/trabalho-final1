import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department) private deptRepo: Repository<Department>,
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
    @InjectRepository(Registration) private regRepo: Repository<Registration>,
  ) {}

  findAll() {
    return this.deptRepo.find();
  }

  findOne(id: number) {
    return this.deptRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Department>) {
    const dept = this.deptRepo.create(data);
    return this.deptRepo.save(dept);
  }

  async update(id: number, data: Partial<Department>) {
    const dept = await this.deptRepo.findOne({ where: { id } });
    if (!dept) throw new NotFoundException('Department not found');
    Object.assign(dept, data);
    return this.deptRepo.save(dept);
  }

  async remove(id: number) {
    const dept = await this.deptRepo.findOne({ where: { id } });
    if (!dept) throw new NotFoundException('Department not found');
    await this.deptRepo.remove(dept);
  }

  async report(id: number) {
    const dept = await this.deptRepo.findOne({ where: { id } });
    if (!dept) throw new NotFoundException('Department not found');
    const events = await this.eventsRepo.find({ where: { department: { id } }, relations: ['registrations'] });
    const totalEvents = events.length;
    const totalRegistrations = events.reduce((sum, e) => sum + (e.registrations?.filter(r => r.active).length ?? 0), 0);
    return { department: dept, totalEvents, totalRegistrations };
  }
}
