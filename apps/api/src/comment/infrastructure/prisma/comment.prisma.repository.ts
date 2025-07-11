import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CommentRepository } from '../../domain/repositories/comment.repository';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { CommentEntity } from '../../domain/entities/comment.entity';
import { CreateCommentInput } from '../../application/dto/create-comment.input';
import { UpdateCommentInput } from '../../application/dto/update-comment.input';
import { Post } from '../../../post/domain/entities/post.entity';
import { User } from '../../../user/domain/entities/user.entity';
import { Comment as PrismaComment, User as PrismaUser, Post as PrismaPost } from '@prisma/client';

function mapPrismaCommentToEntity(
    prismaComment: (PrismaComment & { author?: PrismaUser; post?: PrismaPost }) | null
): CommentEntity | null {
    if (!prismaComment) return null;
    return {
        id: prismaComment.id,
        content: prismaComment.content,
        post: prismaComment.post
            ? {
                id: prismaComment.post.id,
                title: prismaComment.post.title,
                slug: prismaComment.post.slug,
                thumbnail: prismaComment.post.thumbnail,
                content: prismaComment.post.content,
                published: prismaComment.post.published,
                createdAt: prismaComment.post.createdAt,
                updatedAt: prismaComment.post.updatedAt,
                author: null,
                tags: [],
                comments: [],
                _count: { likes: 0, comments: 0 },
            }
            : null,
        author: prismaComment.author
            ? {
                id: prismaComment.author.id,
                name: prismaComment.author.name,
                email: prismaComment.author.email,
                bio: prismaComment.author.bio,
                avatar: prismaComment.author.avatar,
                posts: [],
                comments: [],
            }
            : null,
        createdAt: prismaComment.createdAt,
    };
}

@Injectable()
export class CommentPrismaRepository implements CommentRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findOneByPost({ postId, take, skip }: { postId: number; take?: number; skip?: number }): Promise<CommentEntity[]> {
        const prismaComments = await this.prisma.comment.findMany({
            where: { postId },
            include: { author: true, post: true },
            orderBy: { createdAt: 'desc' },
            skip: skip ?? 0,
            take: take ?? DEFAULT_PAGE_SIZE,
        });
        return prismaComments.map(mapPrismaCommentToEntity) as CommentEntity[];
    }

    async count(postId: number): Promise<number> {
        return await this.prisma.comment.count({ where: { postId } });
    }

    async create(createCommentInput: CreateCommentInput, authorId: number): Promise<CommentEntity> {
        const prismaComment = await this.prisma.comment.create({
            data: {
                content: createCommentInput.content,
                post: { connect: { id: createCommentInput.postId } },
                author: { connect: { id: authorId } },
            },
            include: { author: true, post: true },
        });
        return mapPrismaCommentToEntity(prismaComment)!;
    }

    async update(updateCommentInput: UpdateCommentInput, authorId: number): Promise<CommentEntity> {
        const prismaComment = await this.prisma.comment.update({
            where: { id: updateCommentInput.id, authorId },
            data: {
                content: updateCommentInput.content,
            },
            include: { author: true, post: true },
        });
        return mapPrismaCommentToEntity(prismaComment)!;
    }

    async delete(commentId: number, authorId: number): Promise<boolean> {
        const deleted = await this.prisma.comment.delete({
            where: { id: commentId, authorId },
        });
        return !!deleted;
    }
} 