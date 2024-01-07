import { Module } from '@nestjs/common';
import { UserCorporationController } from './user-corporation.controller';
import { UserCorporationService } from './user-corporation.service';

@Module({
  controllers: [UserCorporationController],
  providers: [UserCorporationService]
})
export class UserCorporationModule {}
