import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Interview from '../entity/interview.entity';
import { InterviewNotfound } from '../exception/interview.exception';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
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
}
