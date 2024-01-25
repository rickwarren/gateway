import { Test, TestingModule } from '@nestjs/testing';
import { CorporationOwnerController } from './corporation-owner.controller';

describe('CorporationOwnerController', () => {
  let controller: CorporationOwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporationOwnerController],
    }).compile();

    controller = module.get<CorporationOwnerController>(CorporationOwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
