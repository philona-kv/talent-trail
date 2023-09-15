import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewService } from './interview.service';
import { ApplicationService } from '../../application/service/application.service';
import { JobService } from '../../job/service/job.service';
import Category from '../entity/category.entity';
import { EmployeeService } from '../../employee/service/employee.service';
import Interviewer from '../entity/interviewer.entity';
import Employee from '../../employee/entity/employee.entity';
import * as _ from 'lodash';

@Injectable()
export class InterviewSchedulerService {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly applicationService: ApplicationService,
    private readonly jobService: JobService,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Interviewer)
    private readonly interviewerRepo: Repository<Interviewer>,

    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
  ) {}

  async schedule(applicationId: number) {
    const application = await this.applicationService.findOne(applicationId);
    const { jobId } = application;
    const job = await this.jobService.getJob(jobId);
    const { title, info } = job;
    const { skills: skillsRequired, experience: experienceRequired } = info;

    const requiredCategory = await this.categoryRepo.findOne({ name: title });
    const employeeWIthRequiredCategory = await this.interviewerRepo.find({
      categoryId: requiredCategory.id,
    });
    const interviews = await this.interviewService.filterInterview({
      applicationId,
    });
    const lastRound = interviews[interviews.length - 1]?.round || 0;

    const interviewTakenEmplyees = interviews.map(
      (interview) => interview.employeeId,
    );

    const eligibleEmployeeIds = employeeWIthRequiredCategory.map(
      (emp) => emp.employeeId,
    );

    if (!eligibleEmployeeIds.length) {
      throw new Error('unable to find eligible interviewer');
    }
    const employeeQuery = await this.employeeRepo
      .createQueryBuilder('emp')
      .where(`emp.id IN (:...empIds)`, { empIds: eligibleEmployeeIds })

      .andWhere('emp.skills && :candidateSkills')
      .andWhere('emp.experience > :experience', {
        experience: experienceRequired,
      });
    if (interviewTakenEmplyees.length) {
      employeeQuery.andWhere('emp.id NOT IN(:...interviewTakenEmplyees)', {
        interviewTakenEmplyees,
      });
    }
    employeeQuery
      .addOrderBy(`ABS(emp.experience - :experience)`, 'ASC')
      .setParameter(
        'candidateSkills',
        skillsRequired.map((skill) => skill.toUpperCase()),
      );

    const employees = await employeeQuery.getMany();

    if (!employees.length) {
      throw new Error('unable to find eligible interviewer');
    }

    const sortedEmployee = employees.sort((a: Employee, b: Employee) => {
      const diff = b.experience - a.experience;
      if (diff > 4) {
        return 1;
      }
      const aSkillDiff = _.intersection(a.skills, skillsRequired);
      const bSkillDiff = _.intersection(b.skills, skillsRequired);
      return bSkillDiff.length - aSkillDiff.length;
    });

    const interview = await this.interviewService.create({
      applicationId,
      candidateId: application.candidateId,
      employeeId: sortedEmployee[0].id,
      status: 'SCHEDULED',
      round: lastRound + 1,
    });

    return interview;
  }


  getAllCategory(){
    return this.categoryRepo.find();
  }
}
