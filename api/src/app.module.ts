import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { CategoryModule } from './category/category.module';
import { ReservationCourseModule } from './reservation_course/reservation_course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StripeModule } from './stripe/stripe.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ScheduleModule } from '@nestjs/schedule';
import { ReviewController } from './review/review.controller';
import { ReviewService } from './review/review.service';
import { ReviewModule } from './review/review.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../.env' });
@Module({
  imports: [
    CoursesModule,
    CategoryModule,
    ReservationCourseModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    StripeModule.forRoot(process.env.STRIPE_KEY, { apiVersion: '2020-08-27' }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
    ReviewModule,
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService, ReviewService],
})
export class AppModule {}
