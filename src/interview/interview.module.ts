import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Interview from './entity/interview.entity';
import { InterviewResolver } from './resolver/interview.resolver';
import { InterviewService } from './service/interview.service';
import { InterviewSchedulerService } from './service/interview.scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Interview])],
  providers: [InterviewResolver, InterviewService,InterviewSchedulerService],
  exports: [],
})
export class InterviewModule {}
