import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  promocode: string;
}
