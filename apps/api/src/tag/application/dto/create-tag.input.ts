import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;
}
