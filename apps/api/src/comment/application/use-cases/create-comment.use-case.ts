import { Injectable, Inject } from '@nestjs/common';
import { COMMENT_REPOSITORY, CommentRepository } from '../../domain/repositories/comment.repository';
import { CreateCommentInput } from '../dto/create-comment.input';

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(COMMENT_REPOSITORY)
        private readonly commentRepository: CommentRepository
    ) { }

    async execute(createCommentInput: CreateCommentInput, authorId: number) {
        // Hier kann zusätzliche Business-Logik stehen (z.B. Validierung, Events, etc.)
        return this.commentRepository.create(createCommentInput, authorId);
    }
} 