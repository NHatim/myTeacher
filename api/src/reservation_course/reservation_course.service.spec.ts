import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCourseService } from './reservation_course.service';

describe('ReservationCourseService', () => {
  let service: ReservationCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationCourseService],
    }).compile();

    service = module.get<ReservationCourseService>(ReservationCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
