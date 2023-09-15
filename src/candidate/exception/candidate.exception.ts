import { NotFoundException } from '@nestjs/common';

export class CandidateNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
