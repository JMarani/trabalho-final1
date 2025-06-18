import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './speaker.entity';
import { SpeakersService } from './speakers.service';
import { SpeakersController } from './speakers.controller';
import { Event } from '../events/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker, Event])],
  controllers: [SpeakersController],
  providers: [SpeakersService],
  exports: [SpeakersService],
})
export class SpeakersModule {}
