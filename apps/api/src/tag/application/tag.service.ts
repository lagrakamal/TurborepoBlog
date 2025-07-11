import { Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { CreateTagUseCase } from './use-cases/create-tag.use-case';
import { UpdateTagUseCase } from './use-cases/update-tag.use-case';
import { DeleteTagUseCase } from './use-cases/delete-tag.use-case';

@Injectable()
export class TagService {
    constructor(
        private readonly createTagUseCase: CreateTagUseCase,
        private readonly updateTagUseCase: UpdateTagUseCase,
        private readonly deleteTagUseCase: DeleteTagUseCase,
    ) { }

    create(createTagInput: CreateTagInput) {
        return this.createTagUseCase.execute(createTagInput);
    }

    findAll() {
        return `This action returns all tag`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tag`;
    }

    update(id: number, updateTagInput: UpdateTagInput) {
        return this.updateTagUseCase.execute(id, updateTagInput);
    }

    remove(id: number) {
        return this.deleteTagUseCase.execute(id);
    }
}
