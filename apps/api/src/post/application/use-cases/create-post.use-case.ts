import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY, PostRepository } from '../../domain/repositories/post.repository';
import { CreatePostInput } from '../dto/create-post.input';

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: PostRepository
    ) { }

    async execute(createPostInput: CreatePostInput, authorId: number) {
        return this.postRepository.create({ createPostInput, authorId });
    }
} 