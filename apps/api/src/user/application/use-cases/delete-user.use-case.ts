import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: number) {
        return this.userRepository.delete(id);
    }
}

export const DeleteUserUseCaseProvider = {
    provide: DeleteUserUseCase,
    useClass: DeleteUserUseCase,
}; 