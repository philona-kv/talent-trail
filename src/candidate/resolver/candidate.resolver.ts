import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Candidate from '../entity/candidate.entity';
import { CandidateService } from '../service/candidate.service';
import {
  CandidateCreateInput,
  CandidateUpdateInput,
} from '../../schema/graphql.schema';

@Resolver('Candidate')
export class CandidateResolver {
  constructor(private candidateService: CandidateService) {}

  @Query()
  getCandidates(): Promise<Candidate[]> {
    return this.candidateService.getAllCandidates();
  }

  @Query()
  getCandidate(@Args('id') id: number) {
    return this.candidateService.getCandidate(id);
  }

  @Query()
  getHotProfiles(
    @Args('skills') skills: string[]
  ) {
    return this.candidateService.getHotProfiles(skills);
  }

  @Mutation()
  candidateSignUp(
    @Args('input') input: CandidateCreateInput,
  ): Promise<Candidate> {
    return this.candidateService.createCandidate(input);
  }

  @Mutation()
  updateCandidate(
    @Args('id') id: number,
    @Args('input') input: CandidateUpdateInput,
  ): Promise<Candidate> {
    return this.candidateService.updateCandidate(id, input);
  }

  @Mutation()
  deleteCandidate(@Args('id') id: number): Promise<Candidate> {
    return this.candidateService.deleteCandidate(id);
  }
}
