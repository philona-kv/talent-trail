import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Interview from '../entity/interview.entity';
import { InterviewNotfound } from '../exception/interview.exception';
import InterviewerVsPreferredSlot from '../entity/interview.preferred.slot.entity';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
    @InjectRepository(InterviewerVsPreferredSlot)
    private readonly interviewSlotRepository: Repository<InterviewerVsPreferredSlot>,
  ) {}

  create(interviewData: Partial<Interview>): Promise<Interview> {
    const interview = this.interviewRepository.create(interviewData);
    return this.interviewRepository.save(interview);
  }

  findAll(): Promise<Interview[]> {
    return this.interviewRepository.find();
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
      this.interviewSlotRepository.create(interviewSlotData);
    return this.interviewSlotRepository.save(interviewSlot);
  }

  async findAllSlot(): Promise<InterviewerVsPreferredSlot[]> {
    return this.interviewSlotRepository.find();
  }

  async findOneSlot(
    userId: number,
    slotId: number,
  ): Promise<InterviewerVsPreferredSlot> {
    const interviewSlot = await this.interviewSlotRepository.findOne({
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
    await this.interviewSlotRepository.update(
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
      throw new NotFoundException(`InterviewSlot with ID  not found`);
    }
    await this.interviewSlotRepository.delete({
      userId: interviewSlot.userId,
      slotId: interviewSlot.slotId,
    });
    return interviewSlot;
  }
}
