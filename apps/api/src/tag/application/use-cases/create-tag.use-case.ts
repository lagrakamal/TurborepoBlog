import { Injectable, Inject } from '@nestjs/common';
import { TAG_REPOSITORY, TagRepository } from '../../domain/repositories/tag.repository';
import { CreateTagInput } from '../dto/create-tag.input';

@Injectable()
export class CreateTagUseCase {
    constructor(
        @Inject(TAG_REPOSITORY)
        private readonly tagRepository: TagRepository
    ) { }

    async execute(createTagInput: CreateTagInput) {
        return this.tagRepository.create(createTagInput);
    }
} 