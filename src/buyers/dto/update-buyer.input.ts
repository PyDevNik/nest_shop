import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateBuyerInput } from './create-buyer.input';

@InputType()
export class UpdateBuyerInput extends PartialType(CreateBuyerInput) {
  @Field()
  id: number;
}
