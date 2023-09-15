// experiences.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Experience } from '../entity/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {}

  async create(experienceData: Partial<Experience>): Promise<Experience> {
    const experience = this.experienceRepository.create(experienceData);
    return this.experienceRepository.save(experience);
  }

  async findAll(): Promise<Experience[]> {
    return this.experienceRepository.find();
  }

  async findOne(id: number): Promise<Experience | undefined> {
    return this.experienceRepository.findOne(id);
  }

  async update(
    id: number,
    experienceData: Partial<Experience>,
  ): Promise<Experience | undefined> {
    await this.experienceRepository.update(id, experienceData);
    return this.experienceRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.experienceRepository.delete(id);
  }
}
