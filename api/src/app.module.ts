import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { TeacherModule } from './teacher/teacher.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [StudentsModule, CoursesModule, TeacherModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
