import { Test, TestingModule } from '@nestjs/testing';
import { UserCharityService } from './user-charity.service';

describe('UserCharityService', () => {
  let service: UserCharityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCharityService],
    }).compile();

    service = module.get<UserCharityService>(UserCharityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
