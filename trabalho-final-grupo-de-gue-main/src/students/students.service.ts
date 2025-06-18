import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentsRepo: Repository<Student>) {}

  findAll() {
    return this.studentsRepo.find();
  }

  findOne(id: number) {
    return this.studentsRepo.findOne({ where: { id } });
  }

  create(data: Partial<Student>) {
    const student = this.studentsRepo.create(data);
    return this.studentsRepo.save(student);
  }

  async update(id: number, data: Partial<Student>) {
    const student = await this.studentsRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    Object.assign(student, data);
    return this.studentsRepo.save(student);
  }

  async remove(id: number) {
    const student = await this.studentsRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    await this.studentsRepo.remove(student);
  }
}
