import { Test, TestingModule } from '@nestjs/testing';
import { UserCharityController } from './user-charity.controller';

describe('UserCharityController', () => {
  let controller: UserCharityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCharityController],
    }).compile();

    controller = module.get<UserCharityController>(UserCharityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
