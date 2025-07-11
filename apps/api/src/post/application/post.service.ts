import { Injectable, Inject } from '@nestjs/common';
import { POST_REPOSITORY, PostRepository } from '../domain/repositories/post.repository';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { CreatePostUseCase } from './use-cases/create-post.use-case';
import { UpdatePostUseCase } from './use-cases/update-post.use-case';
import { DeletePostUseCase } from './use-cases/delete-post.use-case';

@Injectable()
export class PostService {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository
  ) { }

  async findAll({ skip, take }: { skip?: number; take?: number }) {
    return this.postRepository.findAll({ skip, take });
  }

  async count() {
    return this.postRepository.count();
  }

  async findOne(id: number) {
    return this.postRepository.findOne(id);
  }

  async findByUser({ userId, skip, take }: { userId: number; skip: number; take: number }) {
    return this.postRepository.findByUser({ userId, skip, take });
  }

  async userPostCount(userId: number) {
    return this.postRepository.userPostCount(userId);
  }

  async create({ createPostInput, authorId }: { createPostInput: CreatePostInput; authorId: number }) {
    return this.createPostUseCase.execute(createPostInput, authorId);
  }

  async update({ userId, updatePostInput }: { userId: number; updatePostInput: UpdatePostInput }) {
    return this.updatePostUseCase.execute(updatePostInput, userId);
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    return this.deletePostUseCase.execute(postId, userId);
  }
}
