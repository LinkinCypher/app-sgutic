import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notification, NotificationSchema } from './notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports: [NotificationsService]  // Exporta el servicio para ser utilizado en otros módulos
})
export class NotificationsModule {}
