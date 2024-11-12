import { InputType, Field, Float, Int, PartialType } from '@nestjs/graphql';
import { CreateGoodInput } from './create-good.input';

@InputType()
export class UpdateGoodInput extends PartialType(CreateGoodInput) {
  @Field(() => Int)
  id: number;
}
