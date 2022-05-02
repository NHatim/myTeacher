import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}
  async create(createTeacherDto: CreateTeacherDto) {
    {
      const teacher = await this.prisma.teacher.findUnique({
        where: { email: createTeacherDto.email },
      });
      if (teacher !== null) throw new ConflictException('Email already exists');
      return this.prisma.teacher.create({
        data: {
          ...createTeacherDto,
        },
      });
    }
  }

  findAll() {
    return this.prisma.teacher.findMany();
  }

  findOne(id: number) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }
  findOneByEmail(email: string) {
    return this.prisma.teacher.findUnique({ where: { email } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.prisma.student.update({
      where: { id },
      data: {
        ...updateTeacherDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
