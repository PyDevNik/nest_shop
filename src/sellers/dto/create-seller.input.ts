import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
