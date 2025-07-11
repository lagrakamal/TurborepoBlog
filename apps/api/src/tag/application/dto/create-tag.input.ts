import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  name: string;
}
