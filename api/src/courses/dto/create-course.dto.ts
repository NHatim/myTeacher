import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFiles,
  MaxFileSize,
} from 'nestjs-form-data';
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
  places: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  categoryId: number;

  image: any;
}
