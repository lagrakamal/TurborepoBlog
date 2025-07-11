import { CreateUserInput } from '../../../user/application/dto/create-user.input';
import { UpdateUserInput } from '../../../user/application/dto/update-user.input';
import { User } from '../../../user/domain/entities/user.entity';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepository {
    create(createUserInput: CreateUserInput): Promise<User>;
    update(updateUserInput: UpdateUserInput): Promise<User>;
    delete(id: number): Promise<User>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
} 