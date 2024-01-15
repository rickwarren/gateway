import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, NotificationDto, UpdateNotificationDto, createNotification, getNotification, getNotifications, updateNotification } from '../../../post-rpc/src/protos/notification.pb';

@Injectable()
export class NotificationService {
    async getNotificationsService(id: string): Promise<NotificationDto[]> {
        const notifications = await getNotifications(
            { id: id},
            { baseURL: 'http://localhost:8081' },
          );
          return notifications.notifications;
    }

    async getNotificationService(id: string): Promise<NotificationDto> {
        return await getNotification(
            { id: id},
            { baseURL: 'http://localhost:8081' },
        );
    }

    async createNotificationService(data: CreateNotificationDto): Promise<NotificationDto> {
        return await createNotification(
            data,
            { baseURL: 'http://localhost:8081' },
        );
    }

    async updateNotificationService(data: UpdateNotificationDto): Promise<NotificationDto> {
        const notification = await updateNotification(
            data,
            { baseURL: 'http://localhost:8081' },
        );
        return notification;
    }
}
