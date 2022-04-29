import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        ...createStudentDto,
      },
    });
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: {
        ...updateStudentDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
