import { Module } from '@nestjs/common';
import { FriendListController } from './friend-list.controller';
import { FriendListService } from './friend-list.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FriendListController],
  providers: [FriendListService],
})
export class FriendListModule {}
