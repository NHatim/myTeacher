import { IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  content: string;

  @IsNotEmpty()
  @IsString()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  courseId: number;

  @IsNotEmpty()
  @IsString()
  userId: number;
}
