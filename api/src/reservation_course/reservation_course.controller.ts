import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Req,
  Put,
} from '@nestjs/common';
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
  findAll(@Req() req) {
    return this.reservationCourseService.findAll(+req.query.userId);
  }
  @Get('/studentbycourse/:id')
  findStudentByCourse(@Param('id') id: string) {
    return this.reservationCourseService.findStudentByCourse(+id);
  }

  @Put('/present/:userId/:courseId')
  updatePresent(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.reservationCourseService.updatePresent(+userId, +courseId);
  }

  @Get('is-present/:userId/:courseId')
  isPresent(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.reservationCourseService.isPresent(+userId, +courseId);
  }
}
