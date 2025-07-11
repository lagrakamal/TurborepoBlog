import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { COMMENT_REPOSITORY, CommentRepository } from '../domain/repositories/comment.repository';
import { CreateCommentUseCase } from './use-cases/create-comment.use-case';
import { UpdateCommentUseCase } from './use-cases/update-comment.use-case';
import { DeleteCommentUseCase } from './use-cases/delete-comment.use-case';

@Injectable()
export class CommentService {
  constructor(
    private readonly createCommentUseCase: CreateCommentUseCase,
    private readonly updateCommentUseCase: UpdateCommentUseCase,
    private readonly deleteCommentUseCase: DeleteCommentUseCase,
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository
  ) { }

  async findOneByPost({ postId, take, skip }: { postId: number; take?: number; skip?: number }) {
    return this.commentRepository.findOneByPost({ postId, take, skip });
  }

  async count(postId: number) {
    return this.commentRepository.count(postId);
  }

  async create(createCommentInput: CreateCommentInput, authorId: number) {
    return this.createCommentUseCase.execute(createCommentInput, authorId);
  }

  async update(updateCommentInput: UpdateCommentInput, authorId: number) {
    return this.updateCommentUseCase.execute(updateCommentInput, authorId);
  }

  async delete(commentId: number, authorId: number) {
    return this.deleteCommentUseCase.execute(commentId, authorId);
  }
}
