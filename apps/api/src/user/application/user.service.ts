import { Injectable } from '@nestjs/common';
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
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    return this.createUserUseCase.execute(createUserInput);
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    return this.updateUserUseCase.execute(updateUserInput);
  }

  async delete(id: number): Promise<User> {
    return this.deleteUserUseCase.execute(id);
  }

  async findById(id: number): Promise<User | null> {
    return this.getUserUseCase.execute(id);
  }

  async findAll(): Promise<User[]> {
    return this.listUsersUseCase.execute();
  }
}
