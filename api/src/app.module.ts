import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TeacherModule } from './teacher/teacher.module';
import { OrganizationModule } from './organization/organization.module';
import { CategoryModule } from './category/category.module';
import { PromotionModule } from './promotion/promotion.module';
import { ReservationCourseModule } from './reservation_course/reservation_course.module';

@Module({
  imports: [StudentsModule, CoursesModule, TeacherModule, OrganizationModule, CategoryModule, PromotionModule, ReservationCourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
