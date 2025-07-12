import { UseGuards, Logger } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from '../application/like.service';
import { Like } from '../domain/entities/like.entity';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GqlCurrentUser } from '../../auth/interface/decorators/current-user.decorator';

@Resolver(() => Like)
export class LikeResolver {
  private readonly logger = new Logger(LikeResolver.name);

  constructor(private readonly likeService: LikeService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    this.logger.log('User liking post', { userId, postId });
    const result = await this.likeService.likePost(postId, userId);
    this.logger.log('Post liked successfully', { userId, postId, result });
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    this.logger.log('User unliking post', { userId, postId });
    const result = await this.likeService.unlikePost(postId, userId);
    this.logger.log('Post unliked successfully', { userId, postId, result });
    return result;
  }

  @Query(() => Int)
  async postLikesCount(@Args('postId', { type: () => Int! }) postId: number) {
    this.logger.log('Counting likes for post', { postId });
    const count = await this.likeService.getPostLikesCount(postId);
    this.logger.log('Post likes count retrieved', { postId, count });
    return count;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  async userLikedPost(
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    this.logger.log('Checking if user liked post', { userId, postId });
    const result = await this.likeService.userLikedPost(postId, userId);
    this.logger.log('User like status checked', { userId, postId, liked: result });
    return result;
  }
}
