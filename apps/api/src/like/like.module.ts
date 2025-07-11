import { Module } from '@nestjs/common';
import { LikeService } from './application/like.service';
import { LikeResolver } from './interface/like.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { LikePrismaRepository } from './infrastructure/prisma/like.prisma.repository';
import { LIKE_REPOSITORY } from './domain/repositories/like.repository';
import { LikePostUseCase } from './application/use-cases/like-post.use-case';
import { UnlikePostUseCase } from './application/use-cases/unlike-post.use-case';

@Module({
  providers: [
    LikeResolver,
    LikeService,
    PrismaService,
    LikePrismaRepository,
    { provide: LIKE_REPOSITORY, useClass: LikePrismaRepository },
    LikePostUseCase,
    UnlikePostUseCase,
  ],
})
export class LikeModule { }
