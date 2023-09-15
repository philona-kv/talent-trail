import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [NotificationService],
})
export class NotificationModule {}
