import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { ReservationCourseService } from './reservation_course.service';
import { CreateReservationCourseDto } from './dto/create-reservation_course.dto';
import { CreateReservationCoursePaymentDto } from './dto/create-reservation_course_payment.dto';

@Controller('reservation-course')
export class ReservationCourseController {
  constructor(
    private readonly reservationCourseService: ReservationCourseService,
  ) {}

  @Post('/create-payment-intent')
  create(
    @Body() createReservationCourseDto: CreateReservationCourseDto,
    @Res() res: any,
  ) {
    return this.reservationCourseService.create(
      createReservationCourseDto,
      res,
    );
  }

  @Post('/create-reservation-course')
  createReservationCourse(
    @Body()
    createReservationCoursePaymentDto: CreateReservationCoursePaymentDto,
  ) {
    return this.reservationCourseService.createReservationCourse(
      createReservationCoursePaymentDto,
    );
  }

  @Get()
  findAll() {
    return this.reservationCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationCourseService.findOne(+id);
  }
}
