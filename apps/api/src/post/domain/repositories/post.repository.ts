import { CreatePostInput } from '../../../post/application/dto/create-post.input';
import { UpdatePostInput } from '../../../post/application/dto/update-post.input';
import { Post } from '../../../post/domain/entities/post.entity';

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');

export interface PostRepository {
    findAll(params: { skip?: number; take?: number }): Promise<Post[]>;
    count(): Promise<number>;
    findOne(id: number): Promise<Post | null>;
    findByUser(params: { userId: number; skip: number; take: number }): Promise<Post[]>;
    userPostCount(userId: number): Promise<number>;
    create(params: { createPostInput: CreatePostInput; authorId: number }): Promise<Post>;
    update(params: { userId: number; updatePostInput: UpdatePostInput }): Promise<Post>;
    delete(params: { postId: number; userId: number }): Promise<boolean>;
} 