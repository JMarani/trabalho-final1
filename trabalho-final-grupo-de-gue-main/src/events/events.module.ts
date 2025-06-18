import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Speaker } from '../speakers/speaker.entity';
import { Department } from '../departments/department.entity';
import { Registration } from '../registrations/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Speaker, Department, Registration])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
