import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY, PostRepository } from '../../domain/repositories/post.repository';
import { UpdatePostInput } from '../dto/update-post.input';

@Injectable()
export class UpdatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: PostRepository
    ) { }

    async execute(updatePostInput: UpdatePostInput, userId: number) {
        return this.postRepository.update({ userId, updatePostInput });
    }
} 