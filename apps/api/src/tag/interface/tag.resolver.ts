import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';


import { CreateTagInput } from '../application/dto/create-tag.input';
import { UpdateTagInput } from '../application/dto/update-tag.input';
import { TagService } from '../application/tag.service';
import { Tag } from '../domain/entities/tag.entity';

@Resolver(() => Tag)
export class TagResolver {
    constructor(private readonly tagService: TagService) { }

    @Mutation(() => Tag)
    async createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
        return this.tagService.create(createTagInput);
    }

    @Query(() => [Tag])
    async tags() {
        return this.tagService.findAll();
    }
}
