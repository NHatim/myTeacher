import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}
  create(createPromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.create({
      data: {
        ...createPromotionDto,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotion`;
  }
}
