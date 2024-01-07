import { Test, TestingModule } from '@nestjs/testing';
import { UserCorporationService } from './user-corporation.service';

describe('UserCorporationService', () => {
  let service: UserCorporationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCorporationService],
    }).compile();

    service = module.get<UserCorporationService>(UserCorporationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
