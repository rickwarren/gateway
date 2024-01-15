import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CreateNotificationDto, NotificationDto, UpdateNotificationDto } from '../../../post-rpc/src/protos/notification.pb';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get('all/:id')
    getNotifications(@Param('id') id: string): Promise<NotificationDto[]> {
      return this.notificationService.getNotificationsService(id);
    }
  
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(30)
    @Get(':id')
    getNotification(@Param('id') id: string): Promise<NotificationDto> {
      return this.notificationService.getNotificationService(id);
    }
  
    @Post()
    createNotification(@Body() data: CreateNotificationDto): Promise<NotificationDto> {
      return this.notificationService.createNotificationService(data);
    }
  
    @Put()
    updateComment(@Body() data: UpdateNotificationDto): Promise<NotificationDto> {
      return this.notificationService.updateNotificationService(data);
    }
}
