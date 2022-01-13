import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/members')
  getMembers() {
    return this.appService.getMembers();
  }

  @Get('/members/finduser')
  getMember(@Query() member: any)  {
    console.log("Query",member)
    return this.appService.getMember(member);
  }

  @Post('/members')
  postMembers(@Body() member:any) {

    return this.appService.postMembers(member);
  }
}
