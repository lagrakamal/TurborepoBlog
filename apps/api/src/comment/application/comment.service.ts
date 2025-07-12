import { Injectable, Inject, Logger } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { COMMENT_REPOSITORY, CommentRepository } from '../domain/repositories/comment.repository';
import { CreateCommentUseCase } from './use-cases/create-comment.use-case';
import { UpdateCommentUseCase } from './use-cases/update-comment.use-case';
import { DeleteCommentUseCase } from './use-cases/delete-comment.use-case';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);

  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository
  ) { }

  async findOneByPost({ postId, take, skip }: { postId: number; take?: number; skip?: number }) {
    this.logger.log('Finding comments by post', { postId, take, skip });
    const comments = await this.commentRepository.findOneByPost({ postId, take, skip });
    this.logger.log('Comments found for post', { postId, count: comments.length, take, skip });
    return comments;
  }

  async count(postId: number) {
    this.logger.log('Counting comments for post', { postId });
    const count = await this.commentRepository.count(postId);
    this.logger.log('Comment count for post', { postId, count });
    return count;
  }

  async create(createCommentInput: CreateCommentInput, authorId: number) {
    this.logger.log('Creating new comment', {
      authorId,
      postId: createCommentInput.postId,
      contentLength: createCommentInput.content.length
    });
    const comment = await this.createCommentUseCase.execute(createCommentInput, authorId);
    this.logger.log('Comment created successfully', {
      commentId: comment.id,
      postId: comment.post.id,
      authorId
    });
    return comment;
  }

  async update(updateCommentInput: UpdateCommentInput, authorId: number) {
    this.logger.log('Updating comment', {
      commentId: updateCommentInput.id,
      authorId,
      contentLength: updateCommentInput.content?.length
    });
    const comment = await this.updateCommentUseCase.execute(updateCommentInput, authorId);
    this.logger.log('Comment updated successfully', { commentId: comment.id, authorId });
    return comment;
  }

  async delete(commentId: number, authorId: number) {
    this.logger.log('Deleting comment', { commentId, authorId });
    const result = await this.deleteCommentUseCase.execute(commentId, authorId);
    this.logger.log('Comment deleted successfully', { commentId, authorId, result });
    return result;
  }
}
