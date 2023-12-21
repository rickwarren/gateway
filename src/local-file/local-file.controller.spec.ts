import { Test, TestingModule } from '@nestjs/testing';
import { LocalFileController } from './local-file.controller';

describe('LocalFileController', () => {
  let controller: LocalFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalFileController],
    }).compile();

    controller = module.get<LocalFileController>(LocalFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
