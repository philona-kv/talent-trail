import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Interview from './entity/interview.entity';
import { InterviewResolver } from './resolver/interview.resolver';
import { InterviewService } from './service/interview.service';
import InterviewerVsPreferredSlot from './entity/interview.preferred.slot.entity';
import Interviewer from './entity/interviewer.entity';
import { JobModule } from '../job/job.module';
import { ApplicationModule } from '../application/application.module';
import Category from './entity/category.entity';
import { CandidateModule } from '../candidate/candidate.module';
import { ApplicationService } from '../application/service/application.service';
import PreferredSlot from './entity/preferred.slot.entity';
import Application from '../application/entity/application.entity';
import { EmployeeService } from '../employee/service/employee.service';
import Employee from '../employee/entity/employee.entity';
import { InterviewSchedulerService } from './service/interview.scheduler.service';
import { NotificationService } from '../notification/service/notification.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interview,
      InterviewerVsPreferredSlot,
      PreferredSlot,
      Application,
      Employee,
      Interviewer,
      Category,
    ]),
    CandidateModule,
    JobModule,
    ApplicationModule,
    ConfigModule,
  ],
  providers: [
    InterviewResolver,
    InterviewService,
    ApplicationService,
    EmployeeService,
    InterviewSchedulerService,
    NotificationService,
  ],
  exports: [InterviewService],
})
export class InterviewModule {}
