import { Module } from '@nestjs/common';
import { ReservationCourseService } from './reservation_course.service';
import { ReservationCourseController } from './reservation_course.controller';

@Module({
  controllers: [ReservationCourseController],
  providers: [ReservationCourseService]
})
export class ReservationCourseModule {}
