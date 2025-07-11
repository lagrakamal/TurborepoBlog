import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY, PostRepository } from '../../domain/repositories/post.repository';

@Injectable()
export class DeletePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: PostRepository
    ) { }

    async execute(postId: number, userId: number): Promise<boolean> {
        return this.postRepository.delete({ postId, userId });
    }
} 