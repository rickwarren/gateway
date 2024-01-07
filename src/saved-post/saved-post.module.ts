import { Module } from '@nestjs/common';
import { SavedPostController } from './saved-post.controller';
import { SavedPostService } from './saved-post.service';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule,],
  controllers: [SavedPostController],
  providers: [SavedPostService],
})
export class SavedPostModule {}
