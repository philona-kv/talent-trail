import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../../schema/graphql.schema';
import { AuthenticationService } from '../service/authentication.service';
import { Authenticate } from '../decorator/authentication.decorator';

@Resolver()
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation()
  login(@Args('input') input: LoginInput): Promise<string> {
    return this.authenticationService.login(input);
  }

  @Mutation()
  logout(): string {
    return 'User successfully logged out';
  }

  @Authenticate()
  @Query()
  getLoggedInUser(@Context('user') user: any) {
    return this.authenticationService.getLoggedInUserDetails(user);
  }
}
