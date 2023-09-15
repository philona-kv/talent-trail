import { Injectable } from '@nestjs/common';
import { InterviewService } from '../service/interview.service';
import Interview from '../entity/interview.entity';
import { Args, Mutation, Query } from '@nestjs/graphql';
import {
  CreateInterviewInput,
  UpdateInterviewInput,
} from '../../schema/graphql.schema';

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
}
