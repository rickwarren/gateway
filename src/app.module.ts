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
import { VideoModule } from './video/video.module';
import { CharityModule } from './charity/charity.module';
import { UserCharityModule } from './user-charity/user-charity.module';
import { CorporationModule } from './corporation/corporation.module';
import { UserCorporationModule } from './user-corporation/user-corporation.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotificationModule } from './notification/notification.module';

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
    VideoModule,
    CharityModule,
    UserCharityModule,
    CorporationModule,
    UserCorporationModule,
    CacheModule.register({ isGlobal: true }),
    NotificationModule,
  ],
  providers: [
    {
      provide:APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
  ]
})
export class AppModule {}
