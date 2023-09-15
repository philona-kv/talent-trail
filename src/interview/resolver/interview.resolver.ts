import { Injectable } from '@nestjs/common';
import { InterviewService } from '../service/interview.service';
import Interview from '../entity/interview.entity';
import { Args, Mutation, Query } from '@nestjs/graphql';
import {
  CreateInterviewInput,
  CreateInterviewSlotInput,
  GetUniqueInterviewSlotInput,
  UpdateInterviewInput,
  UpdateInterviewSlotInput,
} from '../../schema/graphql.schema';
import InterviewerVsPreferredSlot from '../entity/interview.preferred.slot.entity';

@Injectable()
export class InterviewResolver {
  constructor(private interviewService: InterviewService) {}

  @Query()
  getAllInterviews(): Promise<Interview[]> {
    return this.interviewService.findAll();
  }

  @Query()
  getInterview(@Args('id') id: number) {
    return this.interviewService.findOne(id);
  }

  @Mutation()
  createInterview(@Args('input') input: CreateInterviewInput) {
    return this.interviewService.create(input);
  }

  @Mutation()
  updateInterview(
    @Args('id') id: number,
    @Args('input') input: UpdateInterviewInput,
  ) {
    return this.interviewService.update(id, input);
  }

  @Mutation()
  deleteInterview(@Args('id') id: number) {
    return this.interviewService.remove(id);
  }

  @Query()
  getAllInterviewSlots(): Promise<InterviewerVsPreferredSlot[]> {
    return this.interviewService.findAllSlot();
  }

  @Query()
  getInterviewSlot(@Args('input') input: GetUniqueInterviewSlotInput) {
    return this.interviewService.findOneSlot(input.userId, input.slotId);
  }

  @Mutation()
  createInterviewSlot(@Args('input') input: CreateInterviewSlotInput) {
    return this.interviewService.createSlot(input);
  }

  @Mutation()
  updateInterviewSlot(@Args('input') input: UpdateInterviewSlotInput) {
    return this.interviewService.updateSlot(input);
  }

  @Mutation()
  deleteInterviewSlot(@Args('input') input: GetUniqueInterviewSlotInput) {
    return this.interviewService.removeSlot(input);
  }
}
