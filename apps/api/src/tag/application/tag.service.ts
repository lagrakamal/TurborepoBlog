import { Injectable, Logger, Inject } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { CreateTagUseCase } from './use-cases/create-tag.use-case';
import { UpdateTagUseCase } from './use-cases/update-tag.use-case';
import { DeleteTagUseCase } from './use-cases/delete-tag.use-case';
import { TAG_REPOSITORY, TagRepository } from '../domain/repositories/tag.repository';

@Injectable()
export class TagService {
    private readonly logger = new Logger(TagService.name);

    constructor(
        private readonly createTagUseCase: CreateTagUseCase,
        private readonly updateTagUseCase: UpdateTagUseCase,
        private readonly deleteTagUseCase: DeleteTagUseCase,
        @Inject(TAG_REPOSITORY) private readonly tagRepository: TagRepository,
    ) { }

    async create(createTagInput: CreateTagInput) {
        this.logger.log('Creating new tag', { name: createTagInput.name });
        const tag = await this.createTagUseCase.execute(createTagInput);
        this.logger.log('Tag created successfully', { tagId: tag.id, name: tag.name });
        return tag;
    }

    async findAll() {
        this.logger.log('Finding all tags');
        return this.tagRepository.findAll();
    }

    findOne(id: number) {
        this.logger.log('Finding tag by ID', { tagId: id });
        return `This action returns a #${id} tag`;
    }

    async update(id: number, updateTagInput: UpdateTagInput) {
        this.logger.log('Updating tag', { tagId: id, name: updateTagInput.name });
        const tag = await this.updateTagUseCase.execute(id, updateTagInput);
        this.logger.log('Tag updated successfully', { tagId: tag.id, name: tag.name });
        return tag;
    }

    async remove(id: number) {
        this.logger.log('Deleting tag', { tagId: id });
        const result = await this.deleteTagUseCase.execute(id);
        this.logger.log('Tag deleted successfully', { tagId: id, result });
        return result;
    }
}
