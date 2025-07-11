import { Module } from '@nestjs/common';
import { CommentService } from './application/comment.service';
import { CommentResolver } from './interface/comment.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { CommentPrismaRepository } from './infrastructure/prisma/comment.prisma.repository';
import { COMMENT_REPOSITORY } from './domain/repositories/comment.repository';
import { CreateCommentUseCase } from './application/use-cases/create-comment.use-case';
import { UpdateCommentUseCase } from './application/use-cases/update-comment.use-case';
import { DeleteCommentUseCase } from './application/use-cases/delete-comment.use-case';

@Module({
  providers: [
    CommentResolver,
    CommentService,
    PrismaService,
    CommentPrismaRepository,
    { provide: COMMENT_REPOSITORY, useClass: CommentPrismaRepository },
    CreateCommentUseCase,
    UpdateCommentUseCase,
    DeleteCommentUseCase,
  ],
})
export class CommentModule { }
