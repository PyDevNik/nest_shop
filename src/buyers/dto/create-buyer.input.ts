import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBuyerInput {
  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
