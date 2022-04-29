import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCourseController } from './reservation_course.controller';
import { ReservationCourseService } from './reservation_course.service';

describe('ReservationCourseController', () => {
  let controller: ReservationCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationCourseController],
      providers: [ReservationCourseService],
    }).compile();

    controller = module.get<ReservationCourseController>(ReservationCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
