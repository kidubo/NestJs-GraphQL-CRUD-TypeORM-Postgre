import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginRequest {
  @Field()
  username: string;

  @Field()
  password: string;
}
