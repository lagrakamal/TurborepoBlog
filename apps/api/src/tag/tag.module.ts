import { Module } from '@nestjs/common';
import { TagService } from './application/tag.service';
import { TagResolver } from './interface/tag.resolver';
import { TagPrismaRepository } from './infrastructure/prisma/tag.prisma.repository';
import { TAG_REPOSITORY } from './domain/repositories/tag.repository';
import { CreateTagUseCase } from './application/use-cases/create-tag.use-case';
import { UpdateTagUseCase } from './application/use-cases/update-tag.use-case';
import { DeleteTagUseCase } from './application/use-cases/delete-tag.use-case';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    TagService,
    TagResolver,
    CreateTagUseCase,
    UpdateTagUseCase,
    DeleteTagUseCase,
    {
      provide: TAG_REPOSITORY,
      useClass: TagPrismaRepository,
    },
  ],
  exports: [TagService],
})
export class TagModule { }
