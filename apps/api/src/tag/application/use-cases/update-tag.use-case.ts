import { Injectable, Inject } from '@nestjs/common';
import { TAG_REPOSITORY, TagRepository } from '../../domain/repositories/tag.repository';
import { UpdateTagInput } from '../dto/update-tag.input';

@Injectable()
export class UpdateTagUseCase {
    constructor(
        @Inject(TAG_REPOSITORY)
        private readonly tagRepository: TagRepository
    ) { }

    async execute(id: number, updateTagInput: UpdateTagInput) {
        return this.tagRepository.update(id, updateTagInput);
    }
} 