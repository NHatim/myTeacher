import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import Stripe from 'stripe';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private mailService: MailerService,
  ) {}

  private readonly logger = new Logger(CoursesService.name);

  @Cron('0 1 * * *')
  async handleCron() {
    const courses = await this.prisma.course.findMany({});
    courses.forEach((course) => {
      const dates = course.dateHour[0].split(',');
      dates.forEach(async (date) => {
        const dateISO = new Date(date.split(' ')[0]).toISOString();
        const now = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(now).setDate(new Date(now).getDate() + 1);
        const tomorrowISO = new Date(tomorrow).toISOString();
        if (dateISO === tomorrowISO) {
          const reservationCourse =
            await this.prisma.reservationCourse.findMany({
              where: {
                courseId: Number(course.id),
              },
            });
          reservationCourse.forEach(async (reservation) => {
            const user = await this.prisma.user.findUnique({
              where: {
                id: Number(reservation.userId),
              },
            });
            await this.mailService.sendMail({
              to: user.email,
              from: 'noreply@myteacher.com',
              subject: `Ne ratez pas votre cours le ${date.split(' ')[0]} !`,
              html: `Bonjour <strong> ${
                user.completeName
              } </strong>, <br/> Pour rappel Intitulé du cours :  ${
                course.title
              } commence le ${date.split(' ')[0]} commençant à ${
                date.split(' ')[1]
              } finissant à ${
                date.split(' ')[2]
              }. <br/> Nous vous invitons à vous rendre sur le lieu ${
                course.address
              }`,
            });
          });
        }
      });
    });
  }

  async create(createCourseDto: CreateCourseDto) {
    const foundAuthor = this.prisma.user.findUnique({
      where: {
        id: Number(createCourseDto.authorId),
      },
    });
    if (!foundAuthor) {
      return null;
    }
    if (!createCourseDto.image) {
      createCourseDto.image = './uploads/images/no-img.png';
    }

    if (
      createCourseDto.price < 0 ||
      createCourseDto.placesMax < 0 ||
      createCourseDto.placesMax > 50
    ) {
      throw new Error('Invalid price or places');
    }
    const createdCourse = await this.prisma.course.create({
      data: {
        authorId: Number(createCourseDto.authorId),
        title: createCourseDto.title,
        description: createCourseDto.description,
        price: Number(createCourseDto.price),
        address: createCourseDto.address,
        placesMax: Number(createCourseDto.placesMax),
        currentPlaces: Number(createCourseDto.placesMax),
        categoryId: Number(createCourseDto.categoryId),
        image: createCourseDto.image,
        dateHour: createCourseDto.dateHour,
      },
    });
    await this.stripe.products.create({
      name: createdCourse.title,
      description: createdCourse.description,
      id: createdCourse.id.toString(),
    });
    return this.stripe.prices.create({
      product: createdCourse.id.toString(),
      unit_amount: Number(Math.round(createdCourse.price * 100)),
      currency: 'eur',
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      where: {
        currentPlaces: {
          gt: 0,
        },
      },
      include: {
        category: true,
        author: true,
      },
    });
  }

  findByAuthor(id: number) {
    return this.prisma.course.findMany({
      where: { authorId: Number(id) },
      include: {
        category: true,
      },
    });
  }

  findById(id: number) {
    return this.prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        author: true,
      },
    });
  }
  async update(id: number, updateCourseDto: UpdateCourseDto) {
    await this.stripe.products.update(id.toString(), {
      name: updateCourseDto.title,
      description: updateCourseDto.description,
    });
    return this.prisma.course.update({
      where: { id: Number(id) },
      data: {
        title: updateCourseDto.title,
        description: updateCourseDto.description,
        price: Number(updateCourseDto.price),
        address: updateCourseDto.address,
        placesMax: Number(updateCourseDto.placesMax),
        categoryId: Number(updateCourseDto.categoryId),
        image: updateCourseDto.image,
        dateHour: updateCourseDto.dateHour,
      },
    });
  }

  async remove(id: number) {
    const reservationCourse = await this.prisma.reservationCourse.findFirst({
      where: {
        courseId: Number(id),
      },
    });
    if (reservationCourse) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Le cours a été réservé, vous ne pouvez pas le supprimer',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      await this.stripe.products.del(id.toString());
      return this.prisma.course.delete({
        where: { id: Number(id) },
      });
    }
  }
}
