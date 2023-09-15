import { Injectable } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { ApplicationService } from '../../application/service/application.service';
import { JobService } from '../../job/service/job.service';

@Injectable()
export class InterviewSchedulerService {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly applicationService: ApplicationService,
    private readonly jobService: JobService,
  ) {}

  async schedule(applicationId: number) {
    const application = await this.applicationService.findOne(applicationId);
    const { jobId } = application;
    const job = await this.jobService.getJob(jobId);
    const { title, info } = job;
    const { skills: skillsRequired, experience: experienceRequired } = info;
    
  }
}
