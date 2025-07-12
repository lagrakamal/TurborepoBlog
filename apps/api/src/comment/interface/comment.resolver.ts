import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CommentService } from '../application/comment.service';
import { CommentEntity } from '../domain/entities/comment.entity';
import { CreateCommentInput } from '../application/dto/create-comment.input';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { UseGuards, Logger } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GqlCurrentUser } from '../../auth/interface/decorators/current-user.decorator';

@Resolver(() => CommentEntity)
export class CommentResolver {
  private readonly logger = new Logger(CommentResolver.name);

  constructor(private readonly commentService: CommentService) { }

  @Query(() => [CommentEntity])
  async getPostComments(
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
    this.logger.log('Fetching comments for post', { postId, take, skip });
    const comments = await this.commentService.findOneByPost({ postId, take, skip });
    this.logger.log('Comments fetched successfully', { postId, count: comments.length });
    return comments;
  }

  @Query(() => Int)
  async postCommentCount(@Args('postId', { type: () => Int! }) postId: number) {
    this.logger.log('Counting comments for post', { postId });
    const count = await this.commentService.count(postId);
    this.logger.log('Comment count retrieved', { postId, count });
    return count;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  async createComment(
    @GqlCurrentUser() user,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId = user.id;
    this.logger.log('Creating new comment', {
      authorId,
      postId: createCommentInput.postId,
      contentLength: createCommentInput.content.length
    });
    const comment = await this.commentService.create(createCommentInput, authorId);
    this.logger.log('Comment created successfully', {
      commentId: comment.id,
      postId: comment.post.id,
      authorId
    });
    return comment;
  }
}
