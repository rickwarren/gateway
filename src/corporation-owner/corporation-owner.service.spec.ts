import { Test, TestingModule } from '@nestjs/testing';
import { CorporationOwnerService } from './corporation-owner.service';

describe('CorporationOwnerService', () => {
  let service: CorporationOwnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporationOwnerService],
    }).compile();

    service = module.get<CorporationOwnerService>(CorporationOwnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
