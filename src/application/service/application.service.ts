import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import Application from '../entity/application.entity';
import { ApplicationFilter } from '../../schema/graphql.schema';
import { Status } from '../constants/application.constants';
import { CandidateService } from '../../candidate/service/candidate.service';
import { EmployeeService } from '../../employee/service/employee.service';
import { InterviewService } from '../../interview/service/interview.service';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly interviewService: InterviewService,
    private readonly candidateService: CandidateService,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(applicationData: Partial<Application>): Promise<Application> {
    const application = this.applicationRepository.create(applicationData);
    application.appliedDate = new Date();
    application.status = Status.APPLIED;
    const candidate = await this.candidateService.getCandidate(
      application.candidateId,
    );
    const currenDate = new Date();
    application.timeline = [
      {
        date: currenDate,
        action: Status.APPLIED,
        message: `${candidate.name} applied on ${currenDate.toLocaleDateString(
          'en-us',
          { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' },
        )}`,
      },
      {
        date: currenDate,
        action: Status.HR_PENDING,
        message: `${candidate.name} is pending HR Review`,
      },
    ];
    return await this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return await this.applicationRepository.find();
  }

  async findAllReferred(): Promise<Application[]> {
    return this.applicationRepository.find({
      where: {
        referredBy: Not(IsNull()), // Use IsNull() to generate "IS NOT NULL"
      },
    });
  }

  async findApplications(filter: ApplicationFilter) {
    return this.applicationRepository.find(filter);
  }

  async findByReferredBy(referredBy: number): Promise<Application[]> {
    return await this.applicationRepository.find({ referredBy });
  }

  async findOne(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne(id);
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async update(
    id: number,
    updateData: Partial<Application>,
  ): Promise<Application> {
    const application = await this.findOne(id);
    Object.assign(application, updateData);
    return await this.applicationRepository.save(application);
  }

  async hrStatusUpdate(id: number, accepted: boolean, employeeId: number) {
    const application = await this.findOne(id);
    const currenDate = new Date();
    const candidate = await this.candidateService.getCandidate(
      application.candidateId,
    );
    const employee = await this.employeeService.getEmployee(employeeId);
    if (accepted) {
      application.status = Status.HR_ACCEPTED;
      application.timeline.map((tl) => {
        if (tl.action == Status.HR_PENDING) {
          tl.date = currenDate;
          tl.action = Status.HR_ACCEPTED;
          tl.message = `${candidate.name} is accepted by ${employee.name}`;
        }
      });
      const preferredSlot = await this.interviewService.askForPreferredSlot(
        1,
        candidate.id,
        application.id,
      );
      application.timeline.push({
        date: currenDate,
        action: Status.PENDING_TIMESLOT_SUBMISSION,
        message: `${candidate.name} yet to submit his time slot`,
        round: 1,
        preferredSlotId: preferredSlot.id,
      });
    } else {
      application.status = Status.HR_REJECTED;
      application.timeline.map((tl) => {
        if (tl.action == Status.HR_PENDING) {
          tl.date = currenDate;
          tl.action = Status.HR_REJECTED;
          tl.message = `${candidate.name} is rejected by ${employee.name}`;
        }
      });
      // TO-DO: send rejection mail
    }
    return await this.applicationRepository.save(application);
  }

  async interviewerConfirmation(id: number, accepted: boolean, slotId: number) {
    const application = await this.findOne(id);
    const currenDate = new Date();
    const preferredSlot = await this.interviewService.getSlotById(slotId);
    const candidate = await this.candidateService.getCandidate(
      application.candidateId,
    );
    const interviewerBySlotId =
      await this.interviewService.getActiveInterviewerBySlotId(slotId);
    const employee = await this.employeeService.getEmployee(
      interviewerBySlotId.userId,
    );
    if (accepted) {
      const interview = await this.interviewService.update(
        preferredSlot.interviewId,
        {
          applicationId: id,
          candidateId: candidate.id,
          employeeId: employee.id,
          startDate: preferredSlot.startDate,
          endDate: preferredSlot.endDate,
          round: preferredSlot.round,
        },
      );
      application.status = Status.INTERVIEW_SCHEDULED;
      application.timeline.map((tl) => {
        if (tl.action == Status.PENDING_INTERVIEWER_CONFIRMATION) {
          tl.date = currenDate;
          tl.action = Status.INTERVIEW_SCHEDULED;
          tl.message = `Interview for ${
            candidate.name
          } is scheduled at ${interview.startDate.toLocaleDateString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })} with ${employee.name}`;
        }
      });
      application.timeline.push({
        date: currenDate,
        action: Status.PENDING_INTERVIEW_FEEDBACK,
        message: `Feedback pending from ${employee.name}`,
        round: interview.round,
      });
    } else {
      application.timeline.map((tl) => {
        if (tl.action == Status.PENDING_INTERVIEWER_CONFIRMATION) {
          tl.date = currenDate;
          tl.action = Status.INTERVIEWER_REJECTED;
          tl.message = `Interviewer Rejected the interview with ${candidate.name}`;
        }
      });
      // TO-DO: Reassign the interview to another employee
      application.timeline.push({
        date: currenDate,
        action: Status.PENDING_INTERVIEWER_CONFIRMATION,
        message: `Pending confirmation for interview with ${candidate.name} by ${employee.name}`,
      });
    }
    return await this.applicationRepository.save(application);
  }

  async submitFeedback(id: number, interviewId: number, qualified: boolean) {
    const application = await this.findOne(id);
    const currenDate = new Date();
    const interview = await this.interviewService.findOne(interviewId);
    const candidate = await this.candidateService.getCandidate(
      application.candidateId,
    );
    const employee = await this.employeeService.getEmployee(
      interview.employeeId,
    );
    if (qualified) {
      if (false) {
        // if round < maxround in config
        const preferredSlot = await this.interviewService.askForPreferredSlot(
          interview.round + 1,
          candidate.id,
          application.id,
        );
        application.timeline.push({
          date: currenDate,
          action: Status.PENDING_TIMESLOT_SUBMISSION,
          message: `${candidate.name} yet to submit his time slot`,
          round: interview.round + 1,
          preferredSlotId: preferredSlot.id,
        });
      } else {
        application.timeline.push({
          date: currenDate,
          action: Status.CANDIDATE_ACCEPTED,
          message: `Candidate ${candidate.name} accepted for on-boarding`,
        });
      }
    } else {
      application.timeline.push({
        date: currenDate,
        action: Status.CANDIDATE_REJECTED,
        message: `Candidate ${candidate.name} rejected by ${employee.name}`,
        round: interview.round,
      });
    }
  }

  async updateApplicationTimeline(applicationId: number, data: any) {
    return this.applicationRepository.update(applicationId, {
      timeline: data,
    });
  }

  async remove(id: number): Promise<void> {
    const application = await this.findOne(id);
    await this.applicationRepository.remove(application);
  }
}
