import { CreateCommentInput } from '../../../comment/application/dto/create-comment.input';
import { UpdateCommentInput } from '../../../comment/application/dto/update-comment.input';
import { CommentEntity } from '../../../comment/domain/entities/comment.entity';

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');

export interface CommentRepository {
    findOneByPost(params: { postId: number; take?: number; skip?: number }): Promise<CommentEntity[]>;
    count(postId: number): Promise<number>;
    create(createCommentInput: CreateCommentInput, authorId: number): Promise<CommentEntity>;
    update(updateCommentInput: UpdateCommentInput, authorId: number): Promise<CommentEntity>;
    delete(commentId: number, authorId: number): Promise<boolean>;
} 