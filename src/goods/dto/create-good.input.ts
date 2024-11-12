import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateGoodInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;
}
