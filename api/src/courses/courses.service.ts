import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  create(createCourseDto: CreateCourseDto) {
    const foundAuthor = this.prisma.user.findUnique({
      where: {
        id: createCourseDto.authorId,
      },
    });
    if (!foundAuthor) {
      return null;
    }
    return this.prisma.course.create({
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
  }

  findAll() {
    return this.prisma.course.findMany({
      include: {
        categories: true,
      },
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
function include(include: any, arg1: { categories: boolean }) {
  throw new Error('Function not implemented.');
}
