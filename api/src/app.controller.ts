import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CourseService } from './course.service';
import { Student as StudentModel, Course as CourseModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
  ) {}

  @Get('course/:id')
  async getPostById(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.course({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<CourseModel[]> {
    return this.courseService.courses({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<CourseModel[]> {
    return this.courseService.courses({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('course')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<CourseModel> {
    const { title, content, authorEmail } = postData;
    return this.courseService.createCourse({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('student')
  async signupStudent(
    @Body()
    studentData: {
      firstName: string;
      email: string;
      lastName: string;
      birthDay: string;
      address: string;
      phone: string;
    },
  ): Promise<StudentModel> {
    return this.studentService.createStudent(studentData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.updateCourse({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('course/:id')
  async deletePost(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.deleteCourse({ id: Number(id) });
  }
}
