import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/members')
  getMembers() {
    return this.appService.getMembers();
  }

  @Post('/members')
  postMembers(@Body() member:any) {
    return this.appService.postMembers(member);
  }
}
