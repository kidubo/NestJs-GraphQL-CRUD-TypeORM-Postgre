import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login-request.dto';
import { AccessToken } from './interfaces/access-token.interface';

@Resolver(() => AccessToken)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AccessToken, { name: 'login' })
  login(@Args('loginRequest') loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }
}
