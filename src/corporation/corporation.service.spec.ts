import { Test, TestingModule } from '@nestjs/testing';
import { CorporationService } from './corporation.service';

describe('CorporationService', () => {
  let service: CorporationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorporationService],
    }).compile();

    service = module.get<CorporationService>(CorporationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
