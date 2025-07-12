import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/user.repository';
import { hash } from 'argon2';
import { CreateUserInput } from '../../../user/application/dto/create-user.input';
import { UpdateUserInput } from '../../../user/application/dto/update-user.input';
import { User } from '../../../user/domain/entities/user.entity';
import { Post } from '../../../post/domain/entities/post.entity';
import { CommentEntity } from '../../../comment/domain/entities/comment.entity';
import {
  User as PrismaUser,
  Post as PrismaPost,
  Comment as PrismaComment,
} from '@prisma/client';

function mapPrismaUserToEntity(
  prismaUser:
    | (PrismaUser & { posts?: PrismaPost[]; comments?: PrismaComment[] })
    | null,
): User | null {
  if (!prismaUser) return null;
  return {
    id: prismaUser.id,
    name: prismaUser.name,
    email: prismaUser.email,
    bio: prismaUser.bio,
    avatar: prismaUser.avatar,
    posts:
      prismaUser.posts?.map((p) => ({
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
    comments:
      prismaUser.comments?.map((c) => ({
        id: c.id,
        content: c.content,
        postId: c.postId,
        authorId: c.authorId,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
        post: null,
        author: null,
      })) || [],
  };
}

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  // Das Passwort wird immer als Klartext erwartet und hier gehasht.
  async create(createUserInput: CreateUserInput): Promise<User> {
    const { password, ...user } = createUserInput;
    const hashedPassword = await hash(password);
    try {
      const prismaUser = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          ...user,
        },
        include: { posts: true, comments: true },
      });
      return mapPrismaUserToEntity(prismaUser)!;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const { id, password, ...user } = updateUserInput;
    let data: any = { ...user };
    if (password) {
      const hashedPassword = await hash(password);
      data.password = hashedPassword;
    }
    try {
      const prismaUser = await this.prisma.user.update({
        where: { id },
        data,
        include: { posts: true, comments: true },
      });
      return mapPrismaUserToEntity(prismaUser)!;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      throw error;
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const prismaUser = await this.prisma.user.delete({
        where: { id },
        include: { posts: true, comments: true },
      });
      return mapPrismaUserToEntity(prismaUser)!;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found.`);
      }
      throw error;
    }
  }

  async findById(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true, comments: true },
    });
    return mapPrismaUserToEntity(prismaUser);
  }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      include: { posts: true, comments: true },
    });
    return prismaUsers.map((u) => mapPrismaUserToEntity(u)!);
  }
}
