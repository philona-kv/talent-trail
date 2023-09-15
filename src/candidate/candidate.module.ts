import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidate from './entity/candidate.entity';
import { CandidateResolver } from './resolver/candidate.resolver';
import { CandidateService } from './service/candidate.service';
import { ExperiencesService } from './service/experience.service';
import { Experience } from './entity/experience.entity';
import { SocialProfileService } from './service/social.profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Experience])],
  providers: [CandidateResolver, CandidateService, ExperiencesService,SocialProfileService],
  exports: [CandidateService, ExperiencesService,SocialProfileService],
  controllers: [],
})
export class CandidateModule {}
