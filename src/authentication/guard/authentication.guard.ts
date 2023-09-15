import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as _ from 'lodash';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../service/authentication.service';
import { EnrichedGqlExecutionContext } from '../../common/type/enriched.gql.execution.context';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private authenticationService: AuthenticationService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx =
      GqlExecutionContext.create(
        context,
      ).getContext<EnrichedGqlExecutionContext>();
    const cookieName = this.configService.get('COOKIE_NAME');
    const token = ctx.cookies?.[`${cookieName}`];
    if (!token) {
      return false;
    }
    ctx.user = await this.authenticationService.validateToken(token);
    const groups = this.reflector.get<string[]>('groups', context.getHandler());
    if (!groups.some((group) => ctx.user.groups.includes(group))) {
      return false;
    }
    return true;
  }
}
