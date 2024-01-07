import { Module } from '@nestjs/common';
import { UserCharityController } from './user-charity.controller';
import { UserCharityService } from './user-charity.service';

@Module({
  controllers: [UserCharityController],
  providers: [UserCharityService]
})
export class UserCharityModule {}
