import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field()
  accessToken: string;
}
