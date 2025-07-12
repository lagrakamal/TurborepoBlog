import { Args, Mutation, Query, Resolver, Int } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { UserService } from '../application/user.service';
import { CreateUserInput } from '../application/dto/create-user.input';
import { UpdateUserInput } from '../application/dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    this.logger.log('Creating new user', { email: createUserInput.email });
    const user = await this.userService.create(createUserInput);
    this.logger.log('User created successfully', { userId: user.id, email: user.email });
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    this.logger.log('Updating user', { userId: updateUserInput.id });
    const user = await this.userService.update(updateUserInput);
    this.logger.log('User updated successfully', { userId: user.id });
    return user;
  }

  @Mutation(() => User)
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    this.logger.log('Deleting user', { userId: id });
    const user = await this.userService.delete(id);
    this.logger.log('User deleted successfully', { userId: id });
    return user;
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id', { type: () => Int }) id: number) {
    this.logger.log('Fetching user by ID', { userId: id });
    return await this.userService.findById(id);
  }

  @Query(() => [User])
  async users() {
    this.logger.log('Fetching all users');
    const users = await this.userService.findAll();
    this.logger.log('Users fetched successfully', { count: users.length });
    return users;
  }
}
