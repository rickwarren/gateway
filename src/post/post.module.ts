import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from '../auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, HttpModule,],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
