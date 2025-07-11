import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: number) {
        return this.userRepository.findById(id);
    }
}

export const GetUserUseCaseProvider = {
    provide: GetUserUseCase,
    useClass: GetUserUseCase,
}; 