import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/findteachers')
  findTeachers() {
    return this.usersService.findTeachers();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/email/:id')
  findByEmail(@Param('id') id: string) {
    return this.usersService.findOneEmail(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/contact-teacher')
  async contactTeacher(@Body() body: any) {
    return this.usersService.contactTeacher(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/contact-student')
  async contactStudent(@Body() body: any) {
    return this.usersService.contactStudent(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/contact-students')
  async contactStudents(@Body() body: any) {
    return this.usersService.contactStudents(body);
  }
}
