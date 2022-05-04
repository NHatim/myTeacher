import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReservationCourseDto } from './dto/create-reservation_course.dto';
import { UpdateReservationCourseDto } from './dto/update-reservation_course.dto';

@Injectable()
export class ReservationCourseService {
  constructor(private prisma: PrismaService) {}
  create(createReservationCourseDto: CreateReservationCourseDto) {
    return `This action creates a new reservationCourse`;
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
