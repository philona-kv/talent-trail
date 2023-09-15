import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Interview from '../entity/interview.entity';
import { InterviewNotfound } from '../exception/interview.exception';
import PreferredSlot from '../entity/preferred.slot.entity';
import InterviewerVsPreferredSlot from '../entity/interview.preferred.slot.entity';
import { ApplicationService } from '../../application/service/application.service';
import { Status } from '../../application/constants/application.constants';
import { CandidateService } from '../../candidate/service/candidate.service';
import { InterviewSchedulerService } from './interview.scheduler.service';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
    @InjectRepository(PreferredSlot)
    private readonly preferredSlotRepository: Repository<PreferredSlot>,
    @InjectRepository(InterviewerVsPreferredSlot)
    private readonly interviewerVsPreferredSlotRepository: Repository<InterviewerVsPreferredSlot>,
    @Inject(forwardRef(() => ApplicationService))
    private readonly applicationService: ApplicationService,
    private readonly candidateService: CandidateService,
    private readonly interviewSchedulerService: InterviewSchedulerService,
  ) {}

  create(interviewData: Partial<Interview>): Promise<Interview> {
    const interview = this.interviewRepository.create(interviewData);
    return this.interviewRepository.save(interview);
  }

  findAll(): Promise<Interview[]> {
    return this.interviewRepository.find();
  }

  filterInterview(filter: Partial<Interview>) {
    return this.interviewRepository.find({
      where: {
        ...filter,
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Interview> {
    const interview = await this.interviewRepository.findOne(id);
    if (!interview) {
      throw new NotFoundException(`Interview with ID ${id} not found`);
    }
    return interview;
  }

  async update(
    id: number,
    interviewData: Partial<Interview>,
  ): Promise<Interview> {
    const existingRecord = await this.findOne(id);
    if (!existingRecord) {
      throw new InterviewNotfound(`Interview with id ${id} not found`);
    }
    const record = this.interviewRepository.create({
      ...existingRecord,
      ...interviewData,
    });
    await this.interviewRepository.update(id, record);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Interview> {
    const interview = await this.interviewRepository.findOne(id);
    if (!interview) {
      throw new InterviewNotfound(`Interview with id ${id} not found`);
    }
    await this.interviewRepository.delete(id);
    return interview;
  }

  async createSlot(
    interviewSlotData: Partial<InterviewerVsPreferredSlot>,
  ): Promise<InterviewerVsPreferredSlot> {
    const interviewSlot =
      this.interviewerVsPreferredSlotRepository.create(interviewSlotData);
    return this.interviewerVsPreferredSlotRepository.save(interviewSlot);
  }

  async findAllSlot(): Promise<InterviewerVsPreferredSlot[]> {
    return this.interviewerVsPreferredSlotRepository.find();
  }

  async findOneSlot(
    userId: number,
    slotId: number,
  ): Promise<InterviewerVsPreferredSlot> {
    const interviewSlot =
      await this.interviewerVsPreferredSlotRepository.findOne({
        where: {
          userId,
          slotId,
        },
      });
    if (!interviewSlot) {
      throw new NotFoundException(`InterviewSlot with ID  not found`);
    }
    return interviewSlot;
  }

  async updateSlot(
    interviewSlotData: Partial<InterviewerVsPreferredSlot>,
  ): Promise<InterviewerVsPreferredSlot> {
    // const existingRecord = await this.findOneSlot(id);
    // if (!existingRecord) {
    //   throw new NotFoundException(`InterviewSlot with ID ${id} not found`);
    // }
    // const record = this.interviewSlotRepository.create({
    //   ...existingRecord,
    //   ...interviewSlotData,
    // });
    await this.interviewerVsPreferredSlotRepository.update(
      { userId: interviewSlotData.userId, slotId: interviewSlotData.slotId },
      { status: interviewSlotData.status },
    );
    return this.findOneSlot(interviewSlotData.userId, interviewSlotData.slotId);
  }

  async removeSlot(
    interviewSlotData: Partial<InterviewerVsPreferredSlot>,
  ): Promise<InterviewerVsPreferredSlot> {
    const interviewSlot = await this.findOneSlot(
      interviewSlotData.userId,
      interviewSlotData.slotId,
    );
    if (!interviewSlot) {
      throw new NotFoundException(`InterviewSlot with ID not found`);
    }
    await this.interviewerVsPreferredSlotRepository.delete({
      userId: interviewSlot.userId,
      slotId: interviewSlot.slotId,
    });
    return interviewSlot;
  }

  getSlotById(id: number) {
    return this.preferredSlotRepository.findOne(id);
  }

  getActiveInterviewerBySlotId(slotId: number) {
    return this.interviewerVsPreferredSlotRepository.findOne({
      slotId,
      status: 'PENDING',
    });
  }

  async askForPreferredSlot(
    round: number,
    candidateId: number,
    applicationId: number,
  ) {
    const interviewRecord = this.interviewRepository.create({
      applicationId,
      candidateId,
      round,
      status: 'TO_BE_SCHEDULED',
    });
    const interview = await this.interviewRepository.save(interviewRecord);
    const preferredSlot = this.preferredSlotRepository.create({
      applicationId,
      candidateId,
      round,
      interviewId: interview.id,
    });

    return this.preferredSlotRepository.save(preferredSlot);
  }

  async submitPreferredSlot(slotId: number, startDate: Date, endDate: Date) {
    const preferredSlot = await this.preferredSlotRepository.findOne(slotId);
    const interview = await this.interviewRepository.findOne(
      preferredSlot.interviewId,
    );
    await this.interviewRepository.save({
      ...interview,
      startDate,
      endDate,
    });
    const application = await this.applicationService.findOne(
      preferredSlot.applicationId,
    );
    const candidate = await this.candidateService.getCandidate(
      application.candidateId,
    );
    const timeline = application.timeline;
    const currentDate = new Date();
    timeline.map((tl) => {
      if (tl.action == Status.PENDING_TIMESLOT_SUBMISSION) {
        tl.date = currentDate;
        tl.action = Status.TIMESLOT_SUBMITTED;
        tl.message = `${candidate.name} successfully submitted the time slot`;
      }
    });
    const assignedInterview = await this.interviewSchedulerService.schedule(
      application.id,
    );
    timeline.push({
      date: currentDate,
      action: Status.PENDING_INTERVIEW_FEEDBACK,
      message: `Timeslot submitted by ${candidate.name}`,
      round: interview.round,
    });
    await this.applicationService.updateApplicationTimeline(
      application.id,
      timeline,
    );
    return this.preferredSlotRepository.save({
      ...preferredSlot,
      startDate,
      endDate,
    });
  }
}
