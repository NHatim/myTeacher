import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { CreateReservationCourseDto } from './dto/create-reservation_course.dto';
import { CreateReservationCoursePaymentDto } from './dto/create-reservation_course_payment.dto';

@Injectable()
export class ReservationCourseService {
  constructor(
    private prisma: PrismaService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {}
  async create(
    createReservationCourseDto: CreateReservationCourseDto,
    res: any,
  ) {
    if (
      !createReservationCourseDto.courseId ||
      !createReservationCourseDto.userId
    ) {
      return res.status(400).json({
        message: 'Please provide courseId and userId',
      });
    }

    const foundCourse = await this.prisma.course.findUnique({
      where: {
        id: Number(createReservationCourseDto.courseId),
      },
    });
    if (!foundCourse) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: calculateOrderAmount(foundCourse.price),
      currency: 'eur',
      receipt_email: 'hatim.naimi@gmail.com',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product_id: foundCourse.id,
        clientId: createReservationCourseDto.userId,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  }

  async createReservationCourse(
    createReservationCoursePaymentDto: CreateReservationCoursePaymentDto,
  ) {
    await this.prisma.course.update({
      where: {
        id: Number(createReservationCoursePaymentDto.courseId),
      },
      data: {
        currentPlaces: {
          decrement: 1,
        },
      },
    });
    return this.prisma.reservationCourse.create({
      data: {
        paymentId: createReservationCoursePaymentDto.paymentIntentId,
        user: {
          connect: {
            id: Number(createReservationCoursePaymentDto.userId),
          },
        },
        course: {
          connect: {
            id: Number(createReservationCoursePaymentDto.courseId),
          },
        },
      },
    });
  }
  findEveryReservationCourse() {
    return this.prisma.reservationCourse.findMany({
      include: {
        user: true,
        course: true,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.reservationCourse.findMany({
      include: {
        course: true,
      },
      where: {
        userId: Number(userId),
      },
    });
  }
  findStudentByCourse(courseId: number) {
    return this.prisma.reservationCourse.findMany({
      include: {
        user: true,
      },
      where: {
        courseId: Number(courseId),
      },
    });
  }
  async updatePresent(userId: number, courseId: number) {
    const reservationCourse = await this.prisma.reservationCourse.findFirst({
      where: {
        userId: Number(userId),
        courseId: Number(courseId),
      },
    });
    return this.prisma.reservationCourse.update({
      where: {
        id: reservationCourse.id,
      },
      data: {
        attended: true,
      },
    });
  }

  isPresent(userId: number, courseId: number) {
    return this.prisma.reservationCourse.findFirst({
      where: {
        courseId: Number(courseId),
        userId: Number(userId),
      },
    });
  }
  async findStudent(userId: number) {
    const studentCourses = [];
    const reservationCourses = await this.prisma.reservationCourse.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        course: true,
      },
    });

    for (const reservation of reservationCourses) {
      const course = await this.prisma.course.findFirst({
        where: {
          id: reservation.course.id,
        },
        include: {
          author: true,
          reviews: true,
        },
      });
      studentCourses.push(course);
    }
    return studentCourses;
  }
  pay(id: number) {
    return this.prisma.reservationCourse.update({
      where: {
        id: Number(id),
      },
      data: {
        paidbyadmin: true,
      },
    });
  }
}
function calculateOrderAmount(price: any): number {
  return Math.round(price * 100);
}
