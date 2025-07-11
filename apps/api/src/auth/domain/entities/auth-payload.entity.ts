import { Field, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class AuthPayload {
  @Field()
  @IsNumber()
  id: number;
  @Field()
  @IsString()
  name: string;
  @Field({ nullable: true })
  @IsString()
  avatar?: string;
  @Field()
  @IsString()
  accessToken: string;
}
