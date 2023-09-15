import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Interview from './entity/interview.entity';
import { InterviewResolver } from './resolver/interview.resolver';
import { InterviewService } from './service/interview.service';
import { InterviewSchedulerService } from './service/interview.scheduler.service';
import InterviewerVsPreferredSlot from './entity/interview.preferred.slot.entity';
import Interviewer from './entity/interviewer.entity';
import { JobModule } from '../job/job.module';
import { ApplicationModule } from '../application/application.module';
import Category from './entity/category.entity';
import Employee from '../employee/entity/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interview,
      InterviewerVsPreferredSlot,
      Interviewer,
      Category,
      Employee,
    ]),
    JobModule,
    ApplicationModule,
  ],
  providers: [InterviewResolver, InterviewService, InterviewSchedulerService],
  exports: [],
})
export class InterviewModule {}
