import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagPrismaRepository } from './infrastructure/prisma/tag.prisma.repository';
import { TAG_REPOSITORY } from './domain/repositories/tag.repository';
import { CreateTagUseCase } from './application/use-cases/create-tag.use-case';
import { UpdateTagUseCase } from './application/use-cases/update-tag.use-case';
import { DeleteTagUseCase } from './application/use-cases/delete-tag.use-case';
import { TagService } from './application/tag.service';

@Module({
  providers: [
    PrismaService,
    TagPrismaRepository,
    { provide: TAG_REPOSITORY, useClass: TagPrismaRepository },
    CreateTagUseCase,
    UpdateTagUseCase,
    DeleteTagUseCase,
    TagService,
  ],
})
export class TagModule { }
