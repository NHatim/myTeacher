import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';
import { JwtService } from '@nestjs/jwt';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentsService,
    private teacherService: TeacherService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const userStudent = await this.studentService.findOneByEmail(username);
    const userTeacher = await this.teacherService.findOneByEmail(username);
    if (userStudent && userStudent.password === pass) {
      const { password, ...result } = userStudent;
      return result;
    } else if (userTeacher && userTeacher.password === pass) {
      const { password, ...result } = userTeacher;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
