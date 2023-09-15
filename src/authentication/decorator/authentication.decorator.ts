import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guard/authentication.guard';

export const Authenticate = (...groups: string[]) => {
  return applyDecorators(UseGuards(AuthGuard), SetMetadata('groups', groups));
};
