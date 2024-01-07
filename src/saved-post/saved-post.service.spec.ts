import { Test, TestingModule } from '@nestjs/testing';
import { SavedPostService } from './saved-post.service';

describe('SavedPostService', () => {
  let service: SavedPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedPostService],
    }).compile();

    service = module.get<SavedPostService>(SavedPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
