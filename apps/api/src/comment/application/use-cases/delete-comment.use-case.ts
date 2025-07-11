import { Injectable, Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY, CommentRepository } from '../../domain/repositories/comment.repository';

@Injectable()
export class DeleteCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: CommentRepository
    ) { }

    async execute(commentId: number, authorId: number): Promise<boolean> {
        // Hier kann zusätzliche Business-Logik stehen (z.B. Berechtigungsprüfung)
        return this.commentRepository.delete(commentId, authorId);
    }
} 