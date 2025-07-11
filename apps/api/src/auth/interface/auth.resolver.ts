import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../application/auth.service';
import { AuthPayload } from '../domain/entities/auth-payload.entity';
import { SignInInput } from '../application/dto/signin.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.login(user);
  }
}
