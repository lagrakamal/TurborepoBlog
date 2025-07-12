import { Injectable, Inject, Logger } from '@nestjs/common';
import { POST_REPOSITORY, PostRepository } from '../domain/repositories/post.repository';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { CreatePostUseCase } from './use-cases/create-post.use-case';
import { UpdatePostUseCase } from './use-cases/update-post.use-case';
import { DeletePostUseCase } from './use-cases/delete-post.use-case';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository
  ) { }

  async findAll({ skip, take }: { skip?: number; take?: number }) {
    this.logger.log('Finding all posts', { skip, take });
    const posts = await this.postRepository.findAll({ skip, take });
    this.logger.log('Posts found', { count: posts.length, skip, take });
    return posts;
  }

  async count() {
    this.logger.log('Counting all posts');
    const count = await this.postRepository.count();
    this.logger.log('Post count retrieved', { count });
    return count;
  }

  async findOne(id: number) {
    this.logger.log('Finding post by ID', { postId: id });
    const post = await this.postRepository.findOne(id);
    this.logger.log('Post found', { postId: id, found: !!post });
    return post;
  }

  async findByUser({ userId, skip, take }: { userId: number; skip: number; take: number }) {
    this.logger.log('Finding posts by user', { userId, skip, take });
    const posts = await this.postRepository.findByUser({ userId, skip, take });
    this.logger.log('User posts found', { userId, count: posts.length, skip, take });
    return posts;
  }

  async userPostCount(userId: number) {
    this.logger.log('Counting user posts', { userId });
    const count = await this.postRepository.userPostCount(userId);
    this.logger.log('User post count retrieved', { userId, count });
    return count;
  }

  async create({ createPostInput, authorId }: { createPostInput: CreatePostInput; authorId: number }) {
    this.logger.log('Creating new post', {
      authorId,
      title: createPostInput.title,
      contentLength: createPostInput.content.length
    });
    const post = await this.createPostUseCase.execute(createPostInput, authorId);
    this.logger.log('Post created successfully', { postId: post.id, authorId });
    return post;
  }

    async update({ userId, updatePostInput }: { userId: number; updatePostInput: UpdatePostInput }) {
    this.logger.log('Updating post', { 
      postId: updatePostInput.postId, 
      userId,
      title: updatePostInput.title 
    });
    const post = await this.updatePostUseCase.execute(updatePostInput, userId);
    this.logger.log('Post updated successfully', { postId: post.id, userId });
    return post;
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    this.logger.log('Deleting post', { postId, userId });
    const result = await this.deletePostUseCase.execute(postId, userId);
    this.logger.log('Post deleted successfully', { postId, userId, result });
    return result;
  }
}
