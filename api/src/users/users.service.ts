import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailerService,
  ) {}
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
      await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
      await this.mailService.sendMail({
        to: createUserDto.email,
        from: 'noreply@myteacher.com',
        subject: 'Welcome to MyTeacher ✔',
        text: `Bienvenue sur MyTeacher, ${createUserDto.completeName}, Nous espérons que vous apprécierez notre service.`,
      });
      return 'success';
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

  async findOne(id: number) {
    const { completeName, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });
    return completeName;
  }

  async findOneEmail(id: number) {
    const { email, ...user } = await this.prisma.user.findUnique({
      where: { id },
    });

    return email;
  }

  async findTeachers() {
    return this.prisma.user.findMany({
      where: { role: 'TEACHER' },
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { ReservationCourse: true },
    });
    if (user === null) throw new ConflictException('Email does not exist');
    return user;
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

  async contactTeacher(body: any) {
    const { email, message, subject, courseId, completeName } = body;

    const authorEmail = await this.prisma.course.findFirst({
      where: { id: courseId },
      include: { author: true },
    });
    const date = new Date();
    await this.mailService.sendMail({
      to: authorEmail.author.email,
      from: process.env.MAIL_USERNAME,
      subject: subject,
      html: `Ce message vous a été transmis le <strong>${date}</strong> par l'étudiant <strong>${completeName}</strong><br/>
      ${message}`,
    });
  }
}
