import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  completeName: string;

  @IsString()
  @IsNotEmpty()
  birthDay: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsIn(['TEACHER', 'STUDENT', 'ADMIN'])
  @IsNotEmpty()
  role: 'TEACHER' | 'STUDENT' | 'ADMIN';

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  interests: string[];

  @IsString()
  IBAN: string;
}
