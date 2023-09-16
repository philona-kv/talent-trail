import { Global, Module } from '@nestjs/common';
import { NotificationService } from './service/notification.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [NotificationService],
})
export class NotificationModule {}
