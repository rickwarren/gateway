import { Test, TestingModule } from '@nestjs/testing';
import { CharityController } from './charity.controller';

describe('CharityController', () => {
  let controller: CharityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharityController],
    }).compile();

    controller = module.get<CharityController>(CharityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
