import { Module } from '@nestjs/common';
import { CorporationOwnerController } from './corporation-owner.controller';
import { CorporationOwnerService } from './corporation-owner.service';

@Module({
  controllers: [CorporationOwnerController],
  providers: [CorporationOwnerService]
})
export class CorporationOwnerModule {}
