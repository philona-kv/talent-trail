import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Interview from './entity/interview.entity';
import { InterviewResolver } from './resolver/interview.resolver';
import { InterviewService } from './service/interview.service';
import InterviewerVsPreferredSlot from './entity/interview.preferred.slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interview, InterviewerVsPreferredSlot])],
  providers: [InterviewResolver, InterviewService],
  exports: [],
})
export class InterviewModule {}
