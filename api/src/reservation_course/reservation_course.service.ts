import { Injectable } from '@nestjs/common';
import { CreateReservationCourseDto } from './dto/create-reservation_course.dto';
import { UpdateReservationCourseDto } from './dto/update-reservation_course.dto';

@Injectable()
export class ReservationCourseService {
  create(createReservationCourseDto: CreateReservationCourseDto) {
    return 'This action adds a new reservationCourse';
  }

  findAll() {
    return `This action returns all reservationCourse`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservationCourse`;
  }

  update(id: number, updateReservationCourseDto: UpdateReservationCourseDto) {
    return `This action updates a #${id} reservationCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservationCourse`;
  }
}