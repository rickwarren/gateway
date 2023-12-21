import { Module } from '@nestjs/common';
import { LocalFileController } from './local-file.controller';
import { LocalFileService } from './local-file.service';

@Module({
  controllers: [LocalFileController],
  providers: [LocalFileService]
})
export class LocalFileModule {}
