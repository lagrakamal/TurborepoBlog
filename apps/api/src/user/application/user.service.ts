import { Injectable, Logger } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { ListUsersUseCase } from './use-cases/list-users.use-case';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    this.logger.log('Creating new user', { email: createUserInput.email });
    const user = await this.createUserUseCase.execute(createUserInput);
    this.logger.log('User created successfully', { userId: user.id, email: user.email });
    return user;
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    this.logger.log('Updating user', { userId: updateUserInput.id });
    const user = await this.updateUserUseCase.execute(updateUserInput);
    this.logger.log('User updated successfully', { userId: user.id });
    return user;
  }

  async delete(id: number): Promise<User> {
    this.logger.log('Deleting user', { userId: id });
    const user = await this.deleteUserUseCase.execute(id);
    this.logger.log('User deleted successfully', { userId: id });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    this.logger.log('Finding user by ID', { userId: id });
    const user = await this.getUserUseCase.execute(id);
    this.logger.log('User found', { userId: id, found: !!user });
    return user;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    const users = await this.listUsersUseCase.execute();
    this.logger.log('Users found', { count: users.length });
    return users;
  }
}
