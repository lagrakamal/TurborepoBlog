import { Injectable, Inject, BadRequestException, Logger } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { LIKE_REPOSITORY, LikeRepository } from '../domain/repositories/like.repository';
import { LikePostUseCase } from './use-cases/like-post.use-case';
import { UnlikePostUseCase } from './use-cases/unlike-post.use-case';

@Injectable()
export class LikeService {
  private readonly logger = new Logger(LikeService.name);

  constructor(
    private readonly likePostUseCase: LikePostUseCase,
    private readonly unlikePostUseCase: UnlikePostUseCase,
    @Inject(LIKE_REPOSITORY)
    private readonly likeRepository: LikeRepository
  ) { }

  async likePost(postId: number, userId: number) {
    this.logger.log('User liking post', { userId, postId });
    const result = await this.likePostUseCase.execute(postId, userId);
    this.logger.log('Post liked successfully', { userId, postId, result });
    return result;
  }

  async unlikePost(postId: number, userId: number) {
    this.logger.log('User unliking post', { userId, postId });
    const result = await this.unlikePostUseCase.execute(postId, userId);
    this.logger.log('Post unliked successfully', { userId, postId, result });
    return result;
  }

  async getPostLikesCount(postId: number) {
    this.logger.log('Getting post likes count', { postId });
    const count = await this.likeRepository.getPostLikesCount(postId);
    this.logger.log('Post likes count retrieved', { postId, count });
    return count;
  }

  async userLikedPost(postId: number, userId: number) {
    this.logger.log('Checking if user liked post', { userId, postId });
    const result = await this.likeRepository.userLikedPost({ postId, userId });
    this.logger.log('User like status checked', { userId, postId, liked: result });
    return result;
  }
}
