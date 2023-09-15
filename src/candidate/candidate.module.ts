import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidate from './entity/candidate.entity';
import { CandidateResolver } from './resolver/candidate.resolver';
import { CandidateService } from './service/candidate.service';
import { ExperiencesService } from './service/experience.service';
import { Experience } from './entity/experience.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Experience])],
  providers: [CandidateResolver, CandidateService, ExperiencesService, ConfigService],
  exports: [CandidateService, ExperiencesService],
  controllers: [],
})
export class CandidateModule {}
