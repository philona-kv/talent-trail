import { NotFoundException } from '@nestjs/common';

export class JobNotFoundException extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}
