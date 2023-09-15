import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import Application from '../entity/application.entity';
import { ApplicationFilter } from '../../schema/graphql.schema';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(applicationData: Partial<Application>): Promise<Application> {
    const application = this.applicationRepository.create(applicationData);
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

  async remove(id: number): Promise<void> {
    const application = await this.findOne(id);
    await this.applicationRepository.remove(application);
  }
}
