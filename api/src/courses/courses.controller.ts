import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  Res,
  Put,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { UpdateCourseDto } from './dto/update-course.dto';

export const storage = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    }
    cb(null, false);
  },
};

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    createCourseDto.image = image.filename;
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }
  @Get(':id/course')
  findById(@Param('id') id: number) {
    return this.coursesService.findById(Number(id));
  }

  @Get(':id')
  findByAuhor(@Param('id') id: number) {
    return this.coursesService.findByAuthor(Number(id));
  }

  @Get('/:id/image')
  async getImage(@Param('id') id: any, @Res() res) {
    const course = await this.coursesService.findById(Number(id));
    if (!course) {
      return res.status(404).json({
        message: 'Course not found',
      });
    }
    return res.sendFile(
      join(__dirname, '..', '..', 'uploads', 'images', course.image),
    );
  }

  @UseInterceptors(FileInterceptor('image', storage))
  @Put(':id')
  update(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(Number(id), updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
