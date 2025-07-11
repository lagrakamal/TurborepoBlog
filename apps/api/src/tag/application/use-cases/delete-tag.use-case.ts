import { Injectable, Inject } from '@nestjs/common';
import { TAG_REPOSITORY, TagRepository } from '../../domain/repositories/tag.repository';

@Injectable()
export class DeleteTagUseCase {
    constructor(
        @Inject(TAG_REPOSITORY)
        private readonly tagRepository: TagRepository
    ) { }

    async execute(id: number) {
        return this.tagRepository.delete(id);
    }
} 