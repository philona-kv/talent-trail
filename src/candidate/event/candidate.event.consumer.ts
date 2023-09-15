import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CandidateService } from '../service/candidate.service';
import { Document } from '../../document/entity/document.entity';

@Injectable()
export class CandidateEventConsumer {
  constructor(private candidateService: CandidateService) {}
  @OnEvent('resume.upload', {
    async: true,
  })
  async onResumeUpload(data: Document) {
    this.candidateService.populateCandidateInfo(data);
  }
}
