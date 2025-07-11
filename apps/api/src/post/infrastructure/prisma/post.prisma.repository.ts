import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostRepository } from '../../domain/repositories/post.repository';
import { Post } from '../../domain/entities/post.entity';
import { CreatePostInput } from '../../application/dto/create-post.input';
import { UpdatePostInput } from '../../application/dto/update-post.input';
import { Tag } from '../../../tag/domain/entities/tag.entity';
import { CommentEntity } from '../../../comment/domain/entities/comment.entity';
import { User } from '../../../user/domain/entities/user.entity';
import { Post as PrismaPost, Tag as PrismaTag, Comment as PrismaComment, User as PrismaUser } from '@prisma/client';

function mapPrismaPostToEntity(
    prismaPost: (PrismaPost & { tags?: PrismaTag[]; comments?: PrismaComment[]; author?: PrismaUser }) | null
): Post | null {
    if (!prismaPost) return null;
    return {
        id: prismaPost.id,
        title: prismaPost.title,
        slug: prismaPost.slug,
        thumbnail: prismaPost.thumbnail,
        content: prismaPost.content,
        published: prismaPost.published,
        createdAt: prismaPost.createdAt,
        updatedAt: prismaPost.updatedAt,
        author: prismaPost.author
            ? {
                id: prismaPost.author.id,
                name: prismaPost.author.name,
                email: prismaPost.author.email,
                bio: prismaPost.author.bio,
                avatar: prismaPost.author.avatar,
                posts: [],
                comments: [],
            }
            : null,
        tags: prismaPost.tags?.map((t) => ({ id: t.id, name: t.name, posts: [] })) || [],
        comments: prismaPost.comments?.map((c) => ({
            id: c.id,
            content: c.content,
            postId: c.postId,
            authorId: c.authorId,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
            post: null,
            author: null,
        })) || [],
        _count: { likes: 0, comments: 0 },
    };
}

@Injectable()
export class PostPrismaRepository implements PostRepository {
    constructor(private prisma: PrismaService) { }

    async findAll({ skip = 0, take }: { skip?: number; take?: number }): Promise<Post[]> {
        const prismaPosts = await this.prisma.post.findMany({ skip, take, include: { tags: true, comments: true, author: true } });
        return prismaPosts.map(mapPrismaPostToEntity) as Post[];
    }

    async count(): Promise<number> {
        return await this.prisma.post.count();
    }

    async findOne(id: number): Promise<Post | null> {
        const prismaPost = await this.prisma.post.findFirst({
            where: { id },
            include: { author: true, tags: true, comments: true },
        });
        return mapPrismaPostToEntity(prismaPost);
    }

    async findByUser({ userId, skip, take }: { userId: number; skip: number; take: number }): Promise<Post[]> {
        const prismaPosts = await this.prisma.post.findMany({
            where: { author: { id: userId } },
            include: { tags: true, comments: true, author: true },
            take,
            skip,
        });
        return prismaPosts.map(mapPrismaPostToEntity) as Post[];
    }

    async userPostCount(userId: number): Promise<number> {
        return this.prisma.post.count({ where: { authorId: userId } });
    }

    async create({ createPostInput, authorId }: { createPostInput: CreatePostInput; authorId: number }): Promise<Post> {
        const prismaPost = await this.prisma.post.create({
            data: {
                ...createPostInput,
                author: { connect: { id: authorId } },
                tags: {
                    connectOrCreate: createPostInput.tags.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
            include: { tags: true, comments: true, author: true },
        });
        return mapPrismaPostToEntity(prismaPost)!;
    }

    async update({ userId, updatePostInput }: { userId: number; updatePostInput: UpdatePostInput }): Promise<Post> {
        const authorIdMatched = await this.prisma.post.findUnique({
            where: { id: updatePostInput.postId, authorId: userId },
        });
        if (!authorIdMatched) throw new UnauthorizedException();
        const { postId, thumbnail, ...data } = updatePostInput;
        const updateData: any = { ...data };
        if (typeof thumbnail !== "undefined" && thumbnail !== "") {
            updateData.thumbnail = thumbnail;
        }
        const prismaPost = await this.prisma.post.update({
            where: { id: updatePostInput.postId },
            data: {
                ...updateData,
                tags: {
                    set: [],
                    connectOrCreate: updatePostInput.tags.map((tag) => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
            include: { tags: true, comments: true, author: true },
        });
        return mapPrismaPostToEntity(prismaPost)!;
    }

    async delete({ postId, userId }: { postId: number; userId: number }): Promise<boolean> {
        const authorIdMatched = await this.prisma.post.findUnique({
            where: { id: postId, authorId: userId },
        });
        if (!authorIdMatched) throw new UnauthorizedException();
        const result = await this.prisma.post.delete({
            where: { id: postId, authorId: userId },
        });
        return !!result;
    }
} 