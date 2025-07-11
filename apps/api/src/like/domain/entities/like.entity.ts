import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../../post/domain/entities/post.entity';
import { User } from '../../../user/domain/entities/user.entity';

@ObjectType()
export class Like {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => Post)
  post: Post;

  @Field()
  createAt: Date;
}
