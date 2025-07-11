import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CommentService } from '../application/comment.service';
import { CommentEntity } from '../domain/entities/comment.entity';
import { CreateCommentInput } from '../application/dto/create-comment.input';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GqlCurrentUser } from '../../auth/interface/decorators/current-user.decorator';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Query(() => [CommentEntity])
  getPostComments(
    @Args('postId', { type: () => Int! }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_PAGE_SIZE,
    })
    take: number,
    @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: 0,
    })
    skip: number,
  ) {
    return this.commentService.findOneByPost({ postId, take, skip });
  }

  @Query(() => Int)
  postCommentCount(@Args('postId', { type: () => Int! }) postId: number) {
    return this.commentService.count(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  createComment(
    @GqlCurrentUser() user,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId = user.id;
    return this.commentService.create(createCommentInput, authorId);
  }
}
