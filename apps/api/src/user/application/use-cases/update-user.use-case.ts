import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(updateUserInput: UpdateUserInput) {
        return this.userRepository.update(updateUserInput);
    }
}

export const UpdateUserUseCaseProvider = {
    provide: UpdateUserUseCase,
    useClass: UpdateUserUseCase,
}; 