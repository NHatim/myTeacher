import { Module } from '@nestjs/common';
import { ReservationCourseService } from './reservation_course.service';
import { ReservationCourseController } from './reservation_course.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ReservationCourseController],
  providers: [ReservationCourseService, PrismaService],
})
export class ReservationCourseModule {}
