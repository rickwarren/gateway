import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { FriendListModule } from './friend-list/friend-list.module';
import { CommentModule } from './comment/comment.module';
import { PermissionsModule } from './permissions/permissions.module';
import { LocalFileModule } from './local-file/local-file.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProfileModule,
    PostModule,
    FriendRequestModule,
    FriendListModule,
    CommentModule,
    PermissionsModule,
    LocalFileModule,
    PhotoModule,
  ],
})
export class AppModule {}
