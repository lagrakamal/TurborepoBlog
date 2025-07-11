import { Module } from '@nestjs/common';
import { PostResolver } from './interface/post.resolver';
import { PostService } from './application/post.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostPrismaRepository } from './infrastructure/prisma/post.prisma.repository';
import { POST_REPOSITORY } from './domain/repositories/post.repository';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { UpdatePostUseCase } from './application/use-cases/update-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';

@Module({
  providers: [
    PostResolver,
    PostService,
    PrismaService,
    PostPrismaRepository,
    { provide: POST_REPOSITORY, useClass: PostPrismaRepository },
    CreatePostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
  ],
})
export class PostModule { }
