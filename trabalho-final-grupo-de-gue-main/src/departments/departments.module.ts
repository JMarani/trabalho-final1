import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Event } from '../events/event.entity';
import { Registration } from '../registrations/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Event, Registration])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
