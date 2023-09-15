import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Job from '../entity/job.entity'; // Update the import path
import { Repository } from 'typeorm';
import {
  JobCreateInput, // Update the input type
  JobUpdateInput, // Update the input type
} from '../../schema/graphql.schema';
import { JobNotFoundException } from '../exception/job.exception'; // Update the exception class
import { CommonUtil } from '../../common/util/common.util';

@Injectable()
export class JobService {
  // Update the service class name
  constructor(
    @InjectRepository(Job) // Update the repository type to Job
    private jobRepository: Repository<Job>, // Update the repository variable name
    private commonUtil: CommonUtil,
  ) {}

  public getAllJobs(attributes: Partial<Job>) {
    // Update the method name
    return this.jobRepository.find({
      ...attributes,
    }); // Update the repository method call
  }

  public getJob(id: number) {
    // Update the method name and argument type
    return this.jobRepository.findOne(id); // Update the repository method call
  }

  public createJob(input: JobCreateInput) {
    // Update the method name and argument type
    const newRecord = this.jobRepository.create(
      { ...input },
      // Update the repository variable name
    );
    return this.jobRepository.save(newRecord); // Update the repository method call
  }

  public async updateJob(id: number, input: JobUpdateInput) {
    // Update the method name and argument type
    const existingRecord = await this.jobRepository.findOne(id); // Update the repository method call
    if (!existingRecord) {
      throw new JobNotFoundException(`Job with id ${id} not found`); // Update the exception message
    }
    return this.jobRepository.save({
      // Update the repository variable name
      ...existingRecord,
      input,
    });
  }

  public deleteJob(id: number) {
    // Update the method name and argument type
    const record = this.jobRepository.findOne(id); // Update the repository method call
    if (!record) {
      throw new JobNotFoundException(`Job with id ${id} not found`); // Update the exception message
    }
    this.jobRepository.delete(id); // Update the repository method call
    return record;
  }
}
