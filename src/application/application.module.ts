import { Global, Module, forwardRef } from '@nestjs/common';
import { ApplicationService } from './service/application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationResolver } from './resolver/application.resolver';
import Application from './entity/application.entity';
import { EmployeeModule } from '../employee/employee.module';
import { CandidateModule } from '../candidate/candidate.module';
import { JobModule } from '../job/job.module';
import { InterviewModule } from '../interview/interview.module';
import { NotificationService } from '../notification/service/notification.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    EmployeeModule,
    CandidateModule,
    JobModule,
    ConfigModule,
  ],
  providers: [ApplicationService, ApplicationResolver, NotificationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
