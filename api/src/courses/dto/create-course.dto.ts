import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  placesMax: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  startHour: string;

  @IsNotEmpty()
  @IsString()
  endHour: string;

  @IsNotEmpty()
  categoryId: number;

  image: any;
}
