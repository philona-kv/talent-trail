import { NotFoundException } from '@nestjs/common';

export class InterviewNotfound extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
