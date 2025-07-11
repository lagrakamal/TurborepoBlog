import { CreateLikeInput } from '../../../like/application/dto/create-like.input';
import { UpdateLikeInput } from '../../../like/application/dto/update-like.input';
import { Like } from '../../../like/domain/entities/like.entity';

export const LIKE_REPOSITORY = Symbol('LIKE_REPOSITORY');

export interface LikeRepository {
    likePost(params: { postId: number; userId: number }): Promise<boolean>;
    unlikePost(params: { postId: number; userId: number }): Promise<boolean>;
    getPostLikesCount(postId: number): Promise<number>;
    userLikedPost(params: { postId: number; userId: number }): Promise<boolean>;
    // Erweiterung: findLikesByPost(postId: number): Promise<Like[]>;
    // Erweiterung: findLikesByUser(userId: number): Promise<Like[]>;
} 