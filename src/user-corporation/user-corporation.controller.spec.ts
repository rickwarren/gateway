import { Test, TestingModule } from '@nestjs/testing';
import { UserCorporationController } from './user-corporation.controller';

describe('UserCorporationController', () => {
  let controller: UserCorporationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCorporationController],
    }).compile();

    controller = module.get<UserCorporationController>(UserCorporationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
