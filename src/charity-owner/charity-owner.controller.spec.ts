import { Test, TestingModule } from '@nestjs/testing';
import { CharityOwnerController } from './charity-owner.controller';

describe('CharityOwnerController', () => {
  let controller: CharityOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharityOwnerController],
    }).compile();

    controller = module.get<CharityOwnerController>(CharityOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
