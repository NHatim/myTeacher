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
import { StripeModule } from './stripe/stripe.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../.env' });
@Module({
  imports: [
    CoursesModule,
    CategoryModule,
    PromotionModule,
    ReservationCourseModule,
    AuthModule,
    UsersModule,
    OrganisationModule,
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2020-08-27' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
