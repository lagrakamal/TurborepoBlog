import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/entities/tag.entity';
import { CreateTagInput } from '../../application/dto/create-tag.input';
import { UpdateTagInput } from '../../application/dto/update-tag.input';
import { Post } from '../../../post/domain/entities/post.entity';
import { Tag as PrismaTag, Post as PrismaPost } from '@prisma/client';

function mapPrismaTagToEntity(
  prismaTag: (PrismaTag & { posts?: PrismaPost[] }) | null
): Tag | null {
  if (!prismaTag) return null;
  return {
    id: prismaTag.id,
    name: prismaTag.name,
    posts: prismaTag.posts?.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      content: p.content,
      thumbnail: p.thumbnail,
      published: p.published,
      authorId: p.authorId,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      author: null,
      tags: [],
      comments: [],
      _count: { likes: 0, comments: 0 },
    })) || [],
  };
}

@Injectable()
export class TagPrismaRepository implements TagRepository {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Tag[]> {
    const prismaTags = await this.prisma.tag.findMany({ include: { posts: true } });
    return prismaTags.map(mapPrismaTagToEntity) as Tag[];
  }

  async findOne(id: number): Promise<Tag | null> {
    const prismaTag = await this.prisma.tag.findUnique({ where: { id }, include: { posts: true } });
    return mapPrismaTagToEntity(prismaTag);
  }

  async create(data: CreateTagInput): Promise<Tag> {
    const { name } = data;
    const prismaTag = await this.prisma.tag.create({ data: { name }, include: { posts: true } });
    return mapPrismaTagToEntity(prismaTag)!;
  }

  async update(id: number, data: UpdateTagInput): Promise<Tag> {
    const prismaTag = await this.prisma.tag.update({ where: { id }, data, include: { posts: true } });
    return mapPrismaTagToEntity(prismaTag)!;
  }

  async delete(id: number): Promise<Tag> {
    const prismaTag = await this.prisma.tag.delete({ where: { id }, include: { posts: true } });
    return mapPrismaTagToEntity(prismaTag)!;
  }
} 