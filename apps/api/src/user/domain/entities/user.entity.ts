import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from '../../../comment/domain/entities/comment.entity';
import { Post } from '../../../post/domain/entities/post.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [Post])
  posts?: Post[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];
}
