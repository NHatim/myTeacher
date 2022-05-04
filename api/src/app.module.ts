import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { CategoryModule } from './category/category.module';
import { PromotionModule } from './promotion/promotion.module';
import { ReservationCourseModule } from './reservation_course/reservation_course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganisationModule } from './organisation/organisation.module';

@Module({
  imports: [
    CoursesModule,
    CategoryModule,
    PromotionModule,
    ReservationCourseModule,
    AuthModule,
    UsersModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
