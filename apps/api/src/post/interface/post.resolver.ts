import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from '../application/post.service';
import { Post } from '../domain/entities/post.entity';
import { CreatePostInput } from '../application/dto/create-post.input';
import { UpdatePostInput } from '../application/dto/update-post.input';
import { UseGuards, Logger } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { JwtAuthGuard } from '../../auth/infrastructure/guards/jwt-auth/jwt-auth.guard';
import { GqlCurrentUser } from '../../auth/interface/decorators/current-user.decorator';

@Resolver(() => Post)
export class PostResolver {
  private readonly logger = new Logger(PostResolver.name);

  constructor(private readonly postService: PostService) { }

  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    const user = context.req.user;
    this.logger.log('Fetching all posts', {
      userId: user?.id,
      skip,
      take,
      hasUser: !!user
    });
    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Post])
  getUserPosts(
    @Context() context,
    @Args('skip', { nullable: true, type: () => Int }) skip?: number,
    @Args('take', { nullable: true, type: () => Int }) take?: number,
  ) {
    const user = context.req.user;
    const userId = user.id;
    return this.postService.findByUser({
      userId,
      skip: skip ?? 0,
      take: take ?? DEFAULT_PAGE_SIZE,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Int)
  userPostCount(@Context() context) {
    const user = context.req.user;
    const userId = user.id;
    return this.postService.userPostCount(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  createPost(
    @Context() context,
    @Args('createPostInput') createPostInput: CreatePostInput,
    @GqlCurrentUser() user,
  ) {
    const authorId = user.id;
    return this.postService.create({ createPostInput, authorId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Post)
  updatePost(
    @Context() context,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    return this.postService.update({ userId, updatePostInput });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deletePost(
    @Context() context,
    @Args('postId', { type: () => Int }) postId: number,
    @GqlCurrentUser() user,
  ) {
    const userId = user.id;
    return this.postService.delete({ postId, userId });
  }
}
