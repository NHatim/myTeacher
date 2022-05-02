import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  async create(createStudentDto: CreateStudentDto) {
    {
      const student = await this.prisma.student.findUnique({
        where: { email: createStudentDto.email },
      });
      if (student !== null) throw new ConflictException('Email already exists');
      return this.prisma.student.create({
        data: {
          ...createStudentDto,
        },
      });
    }
  }

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.student.findUnique({ where: { email } });
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
