import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class ListUsersUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute() {
        return this.userRepository.findAll();
    }
}

export const ListUsersUseCaseProvider = {
    provide: ListUsersUseCase,
    useClass: ListUsersUseCase,
}; 