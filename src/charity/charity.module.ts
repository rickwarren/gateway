import { Module } from '@nestjs/common';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';

@Module({
  controllers: [CharityController],
  providers: [CharityService]
})
export class CharityModule {}
