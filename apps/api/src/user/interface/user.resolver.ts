import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { User } from '../domain/entities/user.entity';
import { UserService } from '../application/user.service';
import { CreateUserInput } from '../application/dto/create-user.input';
import { UpdateUserInput } from '../application/dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.delete(id);
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findById(id);
  }

  @Query(() => [User])
  async users() {
    return await this.userService.findAll();
  }
}
