import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    {
      const user = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (user !== null) throw new ConflictException('Email already exists');
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      return this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
    }
  }

  async createTeacher(createUserDto: CreateUserDto) {
    {
      const user = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (user !== null) throw new ConflictException('Email already exists');
      return this.prisma.user.create({
        data: {
          ...createUserDto,
          password: createUserDto.password,
        },
      });
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
