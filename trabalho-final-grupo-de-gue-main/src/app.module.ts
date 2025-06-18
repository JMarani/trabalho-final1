import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { SpeakersModule } from './speakers/speakers.module';
import { DepartmentsModule } from './departments/departments.module';
import { StudentsModule } from './students/students.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventsModule,
    SpeakersModule,
    DepartmentsModule,
    StudentsModule,
    RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
