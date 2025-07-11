import { Injectable, Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY, CommentRepository } from '../../domain/repositories/comment.repository';
import { UpdateCommentInput } from '../dto/update-comment.input';

@Injectable()
export class UpdateCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: CommentRepository
    ) { }

    async execute(updateCommentInput: UpdateCommentInput, authorId: number) {
        // Hier kann zusätzliche Business-Logik stehen (z.B. Berechtigungsprüfung)
        return this.commentRepository.update(updateCommentInput, authorId);
    }
} 