import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => Int)
  @IsNumber()
  postId: number;

  @Field()
  @IsString()
  @MinLength(1, { message: 'Comment content must not be empty' })
  content: string;
}
