import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';

@Module({
  controllers: [CorporationController],
  providers: [CorporationService]
})
export class CorporationModule {}
