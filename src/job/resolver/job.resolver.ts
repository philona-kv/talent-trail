import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import Job from '../entity/job.entity'; // Update the import path
import { JobService } from '../service/job.service'; // Update the service import
import {
  JobCreateInput, // Update the input type
  JobUpdateInput, // Update the input type
} from '../../schema/graphql.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JobNotFoundException } from '../exception/job.exception'; // Update the exception class

@Resolver('Job') // Update the resolver name
export class JobResolver {
  // Update the resolver class name
  constructor(private jobService: JobService) {}

  @Query()
  getJobs(): Promise<Job[]> {
    // Update the method name and return type
    return this.jobService.getAllJobs(); // Update the service method call
  }

  @Query()
  getJob(@Args('id') id: number): Promise<Job> {
    // Update the argument name and return type
    return this.jobService.getJob(id); // Update the service method call
  }

  @Mutation()
  createJob(
    // Update the mutation name
    @Args('input') input: JobCreateInput, // Update the argument name
  ): Promise<Job> {
    // Update the return type
    return this.jobService.createJob(input); // Update the service method call
  }

  @Mutation()
  updateJob(
    // Update the mutation name
    @Args('id') id: number, // Update the argument name
    @Args('input') input: JobUpdateInput, // Update the argument name
  ): Promise<Job> {
    // Update the return type
    return this.jobService.updateJob(id, input); // Update the service method call
  }

  @Mutation()
  deleteJob(@Args('id') id: number): Promise<Job> {
    // Update the argument name
    return this.jobService.deleteJob(id); // Update the service method call
  }
}
