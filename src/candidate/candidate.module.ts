import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidate from './entity/candidate.entity';
import { CandidateResolver } from './resolver/candidate.resolver';
import { CandidateService } from './service/candidate.service';
import { ExperiencesService } from './service/experience.service';
import { Experience } from './entity/experience.entity';
import { SocialProfileService } from './service/social.profile.service';
import { ConfigModule } from '@nestjs/config';
import { CandidateEventConsumer } from './event/candidate.event.consumer';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Experience]), ConfigModule],
  providers: [
    CandidateResolver,
    CandidateService,
    ExperiencesService,
    SocialProfileService,
    CandidateEventConsumer,
  ],
  exports: [CandidateService, ExperiencesService, SocialProfileService],
})
export class CandidateModule {}
