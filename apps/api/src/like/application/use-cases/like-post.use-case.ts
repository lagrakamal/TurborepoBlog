import { Injectable, Inject } from '@nestjs/common';
import { LIKE_REPOSITORY, LikeRepository } from '../../domain/repositories/like.repository';

@Injectable()
export class LikePostUseCase {
    constructor(
        @Inject(LIKE_REPOSITORY)
        private readonly likeRepository: LikeRepository
    ) { }

    async execute(postId: number, userId: number): Promise<boolean> {
        return this.likeRepository.likePost({ postId, userId });
    }
} 