import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { LikeRepository } from '../../domain/repositories/like.repository';

@Injectable()
export class LikePrismaRepository implements LikeRepository {
    constructor(private readonly prisma: PrismaService) { }

    async likePost({ postId, userId }: { postId: number; userId: number }): Promise<boolean> {
        try {
            return !!(await this.prisma.like.create({
                data: { userId, postId },
            }));
        } catch (err) {
            throw new BadRequestException('You have already liked this post');
        }
    }

    async unlikePost({ postId, userId }: { postId: number; userId: number }): Promise<boolean> {
        try {
            await this.prisma.like.delete({
                where: { userId_postId: { userId, postId } },
            });
            return true;
        } catch (err) {
            throw new BadRequestException('Like not found');
        }
    }

    async getPostLikesCount(postId: number): Promise<number> {
        return await this.prisma.like.count({ where: { postId } });
    }

    async userLikedPost({ postId, userId }: { postId: number; userId: number }): Promise<boolean> {
        const like = await this.prisma.like.findFirst({ where: { postId, userId } });
        return !!like;
    }
} 