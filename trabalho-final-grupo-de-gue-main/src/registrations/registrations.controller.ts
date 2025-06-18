import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';

@Controller()
export class RegistrationsController {
  constructor(private readonly service: RegistrationsService) {}

  @Post('events/:eventId/registrations')
  register(@Param('eventId') eventId: number, @Body('studentId') studentId: number) {
    return this.service.register(Number(eventId), Number(studentId));
  }

  @Get('students/:studentId/registrations')
  list(@Param('studentId') studentId: number) {
    return this.service.listByStudent(Number(studentId));
  }

  @Delete('registrations/:id')
  cancel(@Param('id') id: number) {
    return this.service.cancel(Number(id));
  }
}
