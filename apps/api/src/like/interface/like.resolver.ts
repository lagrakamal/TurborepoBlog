import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeService } from '../application/like.service';
import { Like } from '../domain/entities/like.entity';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GqlCurrentUser } from '../../auth/interface/decorators/current-user.decorator';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async likePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    return await this.likeService.likePost(postId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async unlikePost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    return await this.likeService.unlikePost(postId, userId);
  }

  @Query(() => Int)
  postLikesCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.likeService.getPostLikesCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  userLikedPost(
    @Context() context,
    @Args('postId', { type: () => Int! }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    return this.likeService.userLikedPost(postId, userId);
  }
}
