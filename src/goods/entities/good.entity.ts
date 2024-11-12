import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Seller } from 'src/sellers/entities/seller.entity';

@ObjectType()
export class Good {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  sellerId: number;

  @Field(() => Seller)
  seller: Seller;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
