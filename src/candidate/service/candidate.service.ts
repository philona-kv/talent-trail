import {
  Candidate as CandidateGql,
  CandidateCreateInput,
  CandidateUpdateInput,
} from '../../schema/graphql.schema';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import Candidate from '../entity/candidate.entity';
import { CommonUtil } from '../../common/util/common.util';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { CandidateNotFoundException } from '../exception/candidate.exception';
@Injectable()
export class CandidateService {
  private mockarooApi;
  private apiKey;

  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private commonUtil: CommonUtil,
    private configService: ConfigService,
  ) {
    this.mockarooApi = this.configService.get('MOCKAROO_API_ENDPOINT');
    this.apiKey = Buffer.from(
      this.configService.get('MOCKAROO_API_KEY').toString(),
      'base64',
    ).toString('utf-8');
  }

  private async getHeader() {
    return {
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest<T>(method: Method, url: string, data?: any) {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        timeout: 10000,
        headers: { ...(await this.getHeader()) },
      };

      const response: AxiosResponse<T> = await axios(config);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      return {
        isSuccess: false,
        error: `Request failed: ${JSON.stringify(error?.response?.data)}`,
        errorStack: error,
      };
    }
  }

  public getAllCandidates() {
    return this.candidateRepository.find();
  }

  public getCandidate(id: number) {
    return this.candidateRepository.findOne(id);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public async getHotProfiles(skills: string[]) {
    const mockedData = await this.makeRequest<any>(
      'GET',
      `${this.mockarooApi + this.apiKey}`,
    );
    const data: CandidateGql[] = [];
    mockedData.data.map((md) => {
      data.push({
        name: `${md.first_name} ${md.last_name}`,
        age: this.getRandomNumber(20, 30),
        email: md.email,
        id: md.id,
        phone: md.phone,
      });
    });
    return data;
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
