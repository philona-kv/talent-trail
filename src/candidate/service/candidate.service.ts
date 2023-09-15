import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Candidate from '../entity/candidate.entity';
import { Repository } from 'typeorm';
import {
  CandidateCreateInput,
  CandidateUpdateInput,
} from '../../schema/graphql.schema';
import { CandidateNotFoundException } from '../exception/candidate.exception';
import { CommonUtil } from '../../common/util/common.util';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private commonUtil: CommonUtil,
  ) {}

  public getAllCandidates() {
    return this.candidateRepository.find();
  }

  public getCandidate(id: number) {
    return this.candidateRepository.findOne(id);
  }

  public createCandidate(input: CandidateCreateInput) {
    const hashedPassword = this.commonUtil.generatePasswordHash(input.password);
    const newRecord = this.candidateRepository.create({
      ...input,
      password: hashedPassword,
    });
    return this.candidateRepository.save(newRecord);
  }

  public async updateCandidate(id: number, input: CandidateUpdateInput) {
    const existingRecord = await this.candidateRepository.findOne(id);
    let hashedPassword = existingRecord.password;
    if (input.password) {
      hashedPassword = this.commonUtil.generatePasswordHash(input.password);
    }
    if (!existingRecord) {
      throw new CandidateNotFoundException(`Candidate with id ${id} not found`);
    }
    return this.candidateRepository.save({
      ...existingRecord,
      ...input,
      password: hashedPassword,
    });
  }

  public deleteCandidate(id: number) {
    const record = this.candidateRepository.findOne(id);
    if (!record) {
      throw new CandidateNotFoundException(`Candidate with id ${id} not found`);
    }
    this.candidateRepository.delete(id);
    return record;
  }
}
