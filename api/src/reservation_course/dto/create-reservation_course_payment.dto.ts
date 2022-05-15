import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateReservationCoursePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumberString()
  userId: number;

  @IsNotEmpty()
  @IsString()
  paymentIntentId: string;
}
