import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicationService } from '../service/application.service';
import { EmployeeService } from '../../employee/service/employee.service';
import Application from '../entity/application.entity';
import { CandidateService } from '../../candidate/service/candidate.service';
import { JobService } from '../../job/service/job.service';
import { ApplicationFilter } from '../../schema/graphql.schema';

@Resolver('Application')
export class ApplicationResolver {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly employeeService: EmployeeService,
    private readonly candidateService: CandidateService,
    private readonly jobService: JobService,
  ) {}
  @Query()
  getAllReferred() {
    return this.applicationService.findAllReferred();
  }

  @Query()
  findApplications(filter?:ApplicationFilter){
    return this.applicationService.findApplications(filter);
  }

  @ResolveField('referrer')
  _referrer(application: Application) {
    if (!application.referredBy) return;
    return this.employeeService.getEmployee(application.referredBy);
  }

  @ResolveField('candidate')
  _candidate(application: Application) {
    return this.candidateService.getCandidate(application.candidateId);
  }

  @ResolveField('job')
  _job(application: Application) {
    return this.jobService.getJob(application.jobId);
  }
}
