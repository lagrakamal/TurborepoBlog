import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../../post/domain/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Post])
  posts: Post[];
}
