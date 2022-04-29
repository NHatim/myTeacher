import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationCourseService } from './reservation_course.service';
import { CreateReservationCourseDto } from './dto/create-reservation_course.dto';
import { UpdateReservationCourseDto } from './dto/update-reservation_course.dto';

@Controller('reservation-course')
export class ReservationCourseController {
  constructor(private readonly reservationCourseService: ReservationCourseService) {}

  @Post()
  create(@Body() createReservationCourseDto: CreateReservationCourseDto) {
    return this.reservationCourseService.create(createReservationCourseDto);
  }

  @Get()
  findAll() {
    return this.reservationCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationCourseDto: UpdateReservationCourseDto) {
    return this.reservationCourseService.update(+id, updateReservationCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationCourseService.remove(+id);
  }
}
