import { Inject, Injectable, Res } from '@nestjs/common';

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
  ) {}

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
        startDate: createCourseDto.startDate,
        categoryId: Number(createCourseDto.categoryId),
        image: createCourseDto.image,
        startHour: createCourseDto.startHour,
        endHour: createCourseDto.endHour,
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
      },
    });
  }
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
