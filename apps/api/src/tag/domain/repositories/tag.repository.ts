import { CreateTagInput } from '../../../tag/application/dto/create-tag.input';
import { UpdateTagInput } from '../../../tag/application/dto/update-tag.input';
import { Tag } from '../../../tag/domain/entities/tag.entity';

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');

export interface TagRepository {
    findAll(): Promise<Tag[]>;
    findOne(id: number): Promise<Tag | null>;
    create(data: CreateTagInput): Promise<Tag>;
    update(id: number, data: UpdateTagInput): Promise<Tag>;
    delete(id: number): Promise<Tag>;
} 