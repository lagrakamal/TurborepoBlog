import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { LIKE_REPOSITORY, LikeRepository } from '../domain/repositories/like.repository';
import { LikePostUseCase } from './use-cases/like-post.use-case';
import { UnlikePostUseCase } from './use-cases/unlike-post.use-case';

@Injectable()
export class LikeService {
  constructor(
    private readonly likePostUseCase: LikePostUseCase,
    private readonly unlikePostUseCase: UnlikePostUseCase,
    @Inject(LIKE_REPOSITORY)
    private readonly likeRepository: LikeRepository
  ) { }

  async likePost(postId: number, userId: number) {
    return this.likePostUseCase.execute(postId, userId);
  }

  async unlikePost(postId: number, userId: number) {
    return this.unlikePostUseCase.execute(postId, userId);
  }

  async getPostLikesCount(postId: number) {
    return this.likeRepository.getPostLikesCount(postId);
  }

  async userLikedPost(postId: number, userId: number) {
    return this.likeRepository.userLikedPost({ postId, userId });
  }
}
