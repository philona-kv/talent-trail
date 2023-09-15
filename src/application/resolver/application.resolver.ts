import { Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ApplicationService } from '../service/application.service';
import { EmployeeService } from '../../employee/service/employee.service';
import Application from '../entity/application.entity';
import { CandidateService } from '../../candidate/service/candidate.service';

@Resolver()
export class ApplicationResolver {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly employeeService: EmployeeService,
    private readonly candidateService: CandidateService,
  ) {}
  @Query()
  getAllReferred() {
    return this.applicationService.findAllReferred();
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
}
