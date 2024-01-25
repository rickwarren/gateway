import { Test, TestingModule } from '@nestjs/testing';
import { CharityOwnerService } from './charity-owner.service';

describe('CharityOwnerService', () => {
  let service: CharityOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharityOwnerService],
    }).compile();

    service = module.get<CharityOwnerService>(CharityOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
