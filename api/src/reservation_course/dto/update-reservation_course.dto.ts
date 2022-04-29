import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationCourseDto } from './create-reservation_course.dto';

export class UpdateReservationCourseDto extends PartialType(CreateReservationCourseDto) {}
