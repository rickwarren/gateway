import { Test, TestingModule } from '@nestjs/testing';
import { SavedPostController } from './saved-post.controller';

describe('SavedPostController', () => {
  let controller: SavedPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedPostController],
    }).compile();

    controller = module.get<SavedPostController>(SavedPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
