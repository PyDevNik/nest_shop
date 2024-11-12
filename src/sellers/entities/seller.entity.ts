import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Good } from '../../goods/entities/good.entity';

@ObjectType()
export class Seller {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field(() => [Good])
  goods: Good[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
