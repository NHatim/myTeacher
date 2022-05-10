import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/prisma.service';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, PrismaService],
  imports: [NestjsFormDataModule],
})
export class CoursesModule {}
