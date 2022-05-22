import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        ...createReviewDto,
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  findByCourse(id: number) {
    return this.prisma.review.findMany({
      where: {
        courseId: Number(id),
      },
    });
  }

  findByCourseAndUser(courseId: number, userId: number) {
    return this.prisma.review.findFirst({
      where: {
        courseId: Number(courseId),
        userId: Number(userId),
      },
    });
  }

  findByUser(id: number) {
    return this.prisma.review.findMany({
      where: {
        userId: Number(id),
      },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: {
        id: Number(id),
      },
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: {
        id: Number(id),
      },
      data: {
        ...updateReviewDto,
      },
    });
  }
}
