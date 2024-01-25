import { Module } from '@nestjs/common';
import { CharityOwnerController } from './charity-owner.controller';
import { CharityOwnerService } from './charity-owner.service';

@Module({
  controllers: [CharityOwnerController],
  providers: [CharityOwnerService]
})
export class CharityOwnerModule {}
