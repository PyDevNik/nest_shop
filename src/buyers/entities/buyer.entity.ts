import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Buyer {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
