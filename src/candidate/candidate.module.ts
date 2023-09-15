import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidate from './entity/candidate.entity';
import { CandidateResolver } from './resolver/candidate.resolver';
import { CandidateService } from './service/candidate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate])],
  providers: [CandidateResolver, CandidateService],
  controllers: [],
})
export class CandidateModule {}
