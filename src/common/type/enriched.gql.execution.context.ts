import { GqlExecutionContext } from '@nestjs/graphql';

export interface EnrichedGqlExecutionContext extends GqlExecutionContext {
  req?: any;
  res?: any;
  user?: any;
  type: string;
  headers?: any;
  cookies?: any;
  body?: string;
  startTime?: Date;
  requestId: string;
  requestUrl?: string;
}
