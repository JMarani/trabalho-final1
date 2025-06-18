import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Speaker } from './speaker.entity';
import { Event } from '../events/event.entity';

@Injectable()
export class SpeakersService {
  constructor(
    @InjectRepository(Speaker) private speakersRepo: Repository<Speaker>,
    @InjectRepository(Event) private eventsRepo: Repository<Event>,
  ) {}

  findAll() {
    return this.speakersRepo.find();
  }

  findOne(id: number) {
    return this.speakersRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Speaker>) {
    const speaker = this.speakersRepo.create(data);
    return this.speakersRepo.save(speaker);
  }

  async update(id: number, data: Partial<Speaker>) {
    const speaker = await this.speakersRepo.findOne({ where: { id } });
    if (!speaker) throw new NotFoundException('Speaker not found');
    Object.assign(speaker, data);
    return this.speakersRepo.save(speaker);
  }

  async remove(id: number) {
    const speaker = await this.speakersRepo.findOne({ where: { id }, relations: ['events'] });
    if (!speaker) throw new NotFoundException('Speaker not found');
    if (speaker.events && speaker.events.length > 0) {
      throw new BadRequestException('Cannot delete speaker linked to events');
    }
    await this.speakersRepo.remove(speaker);
  }
}
