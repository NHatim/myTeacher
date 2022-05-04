import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(private prisma: PrismaService) {}
  create(createOrganisationDto: CreateOrganisationDto) {
    return this.prisma.organisation.create({
      data: {
        ...createOrganisationDto,
      },
    });
  }

  findAll() {
    return `This action returns all organisation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organisation`;
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }
}
