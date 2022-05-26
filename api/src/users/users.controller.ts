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
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() req: any) {
    return this.usersService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/userid/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(+id);
  }

  @Get('/findteachers')
  findTeachers() {
    return this.usersService.findTeachers();
  }

  // @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put('/modify-role/:id')
  async modifyRole(@Param('id') id: string, @Body() body: any) {
    return this.usersService.modifyRole(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }

}
