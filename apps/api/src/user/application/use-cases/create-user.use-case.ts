import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(createUserInput: CreateUserInput) {
        return this.userRepository.create(createUserInput);
    }
}

export const CreateUserUseCaseProvider = {
    provide: CreateUserUseCase,
    useClass: CreateUserUseCase,
}; 