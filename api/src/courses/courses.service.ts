import { Inject, Injectable } from '@nestjs/common';
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
        id: createCourseDto.authorId,
      },
    });
    if (!foundAuthor) {
      return null;
    }
    const createdCourse = await this.prisma.course.create({
      data: {
        ...createCourseDto,
        categories: {
          connect: [
            {
              id: createCourseDto.categories,
            },
          ],
        },
      },
    });
    await this.stripe.products.create({
      name: createdCourse.title,
      description: createdCourse.description,
      id: createdCourse.id.toString(),
    });
    return this.stripe.prices.create({
      product: createdCourse.id.toString(),
      unit_amount: createdCourse.price,
      currency: 'eur',
    });
  }

  async findAll() {
    // return this.prisma.course.findMany({
    //   include: {
    //     categories: true,
    //   },
    // });

    return await this.stripe.prices.list({
      limit: 3,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
