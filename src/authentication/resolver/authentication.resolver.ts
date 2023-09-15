import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../../schema/graphql.schema';
import { AuthenticationService } from '../service/authentication.service';

@Resolver()
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation()
  async login(
    @Args('input') input: LoginInput,
    @Context('res') res: any,
  ): Promise<string> {
    const token = await this.authenticationService.login(input);
    this.authenticationService.setCookie(res, token);
    return token;
  }

  @Mutation()
  logout(@Context('res') res: any): string {
    this.authenticationService.clearCookie(res);
    return 'User successfully logged out';
  }
}
